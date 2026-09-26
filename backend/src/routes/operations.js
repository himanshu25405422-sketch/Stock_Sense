const express = require('express');
const router = express.Router();
const operationController = require('../controllers/operationController');

router.get('/', operationController.getOperations);
router.get('/:id', operationController.getOperationById);
router.post('/', operationController.createOperation);
router.patch('/:id/status', operationController.updateOperationStatus);
router.post('/:id/validate', operationController.validateOperation);

module.exports = router;
