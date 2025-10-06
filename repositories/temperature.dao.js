const temperature = require("../models/temperature");
const Temperature = require("../models/temperature");
exports.saveTemperature= async (temperature) =>{
    const result = await temperature.save();
    console.log('Saved successfully.');
    return result;
};
exports.getHottestCity = async (province,date) => {
    try{
    const hottests = await Temperature.find({province,date})
                        .sort({max_temp:-1})
                        .limit(1)
                        .exec();
    if (hottests.length === 0)
        return null;
    return hottests[0];
    }
    catch(error){
        throw error;
    }
};
exports.getAverage = async (province,date) =>{
    const matchStage = { $match: { date: date,province:province } }
    const groupStage = {$group:{_id:null,min_avg:{$avg:'$min_temp'}}}
    try{
    const averageObject = await temperature.aggregate(
            [matchStage,groupStage]
  )
  return averageObject
}catch(error){
    console.log(error)
    throw error
}
}
exports.deleteRecord = async (id) =>{
    const result = await Temperature.deleteOne({_id:id})
    return result;
}
