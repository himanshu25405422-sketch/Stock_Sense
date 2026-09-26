const Location = require('../models/Location');
const StockQuant = require('../models/StockQuant');

exports.getLocations = async (req, res) => {
  const locations = await Location.findAll();
  res.json(locations);
};

exports.createLocation = async (req, res) => {
  const newLoc = await Location.create(req.body);
  res.status(201).json(newLoc);
};

exports.getStockQuants = async (req, res) => {
  const quants = await StockQuant.findAll();
  res.json(quants);
};
