const express = require('express');
const router = express.Router();
const Temperature = require('../models/temperature');

// POST /weather
router.post('/', async (req, res) => {
  try {
    const record = new Temperature(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

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

module.exports = router;
