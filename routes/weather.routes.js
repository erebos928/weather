const express = require('express');
const router = express.Router();
const Temperature = require('../models/temperature');
const weather = require('../controllers/weather.controller');

// POST /weather
router.post('/', weather.createTemprature);
//
router.post('/interval',weather.getTemperatures);
// GET /weather
router.get('/', async (req, res) => {
  const records = [
    {
      date: "2025-07-31",
      city: "Montreal",
      province: "QC",
      max_temp: 33,
      min_temp: 21
    }
  ];//await Temperature.find();
  res.json(records);
});
router.post('/hottest',weather.getHottestCityRecord);
module.exports = router;
