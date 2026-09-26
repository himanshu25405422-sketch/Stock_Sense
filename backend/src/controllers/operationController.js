const StockOperation = require('../models/StockOperation');

exports.getOperations = async (req, res) => {
  const { document_type, status, location_id } = req.query;
  const operations = await StockOperation.findAll({ document_type, status, location_id });
  res.json(operations);
};

exports.getOperationById = async (req, res) => {
  const op = await StockOperation.findById(req.params.id);
  if (!op) return res.status(404).json({ error: 'Stock operation not found' });
  res.json(op);
};

exports.createOperation = async (req, res) => {
  const op = await StockOperation.create(req.body);
  res.status(201).json(op);
};

exports.updateOperationStatus = async (req, res) => {
  const { status } = req.body;
  const op = await StockOperation.updateStatus(req.params.id, status);
  if (!op) return res.status(404).json({ error: 'Stock operation not found' });
  res.json(op);
};

exports.validateOperation = async (req, res) => {
  const op = await StockOperation.updateStatus(req.params.id, 'DONE');
  if (!op) return res.status(404).json({ error: 'Stock operation not found' });
  res.json({ message: 'Operation validated successfully', operation: op });
};
