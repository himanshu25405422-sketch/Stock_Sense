const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');

router.get('/', deliveryController.getAllDeliveries);
router.post('/', deliveryController.createDelivery);
router.post('/:id/validate', deliveryController.validateDelivery);

module.exports = router;
