const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

router.get('/', auth, supplierController.getAll);
router.get('/:id', auth, supplierController.getOne);
router.post('/', auth, adminOnly, supplierController.create);
router.put('/:id', auth, adminOnly, supplierController.update);
router.delete('/:id', auth, adminOnly, supplierController.remove);

module.exports = router;