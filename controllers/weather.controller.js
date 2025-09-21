const weatherService = require('../services/weather.service');

exports.createTemprature = async (req,res) => {
    try{
        const newTemperature = await weatherService.createTemprature(req.body);
        res.status(201).json(newTemperature);
    }catch(error){
        res.status(400).json({message:error.message});
    }
};
exports.getTemperatures = async (req,res)=>{
try{
        const temperatures = await  weatherService.getTemperatures(req.body);
        res.status(200).json(temperatures);
}catch(error){
    console.log(error.message);
    res.status(400).json({message:error.message});
}
};
exports.getHottestCityRecord = async (req,res) =>{
       try{
        const hottestCityProvinceRecord = await weatherService.getHottestCity(req.body);
        res.status(200).json(hottestCityProvinceRecord);
       }catch(error){
            res.status(500).json({message:error.message});
        }
};