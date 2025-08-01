const mongoose = require('mongoose');

const temperatureSchema = new mongoose.Schema({
  date: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  max_temp: { type: Number, required: true },
  min_temp: { type: Number, required: true }
});

module.exports = mongoose.model('Temperature', temperatureSchema);
