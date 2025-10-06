const temperature = require("../models/temperature");
const dao = require("../repositories/temperature.dao");
exports.createTemprature = async (params) => {
  const temp = new temperature({
    date: params.date,
    city: params.city,
    province: params.province,
    max_temp: params.max_temp,
    min_temp: params.min_temp,
  });
  const r = await dao.saveTemperature(temp);
  return r;
};
exports.getTemperatures = async (req, res) => {
  return [{ city: "Ahvaz" }];
};
exports.getHottestCity = async (params) => {
  const record = await dao.getHottestCity(params.province,params.date);
  return record;
};
exports.getAverage = async (province,date)=>{
  const result = await dao.getAverage(province,date)
  if (result.length > 0)
    return result[0]
  else
    return undefined
};
exports.deleteRecord = async (id)=>{
  const result = await dao.deleteRecord(id)
  return result
  }