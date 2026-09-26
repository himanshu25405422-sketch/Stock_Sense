const express = require('express');
const router = express.Router();
const receiptController = require('../controllers/receiptController');

router.get('/', receiptController.getAllReceipts);
router.post('/', receiptController.createReceipt);
router.post('/:id/items', receiptController.addReceiptItem);
router.post('/:id/validate', receiptController.validateReceipt);

module.exports = router;
