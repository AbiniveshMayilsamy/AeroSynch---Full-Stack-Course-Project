const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

// Both can view - but users see only their own, admin sees all
router.get('/', auth, orderController.getAll);
router.get('/:id', auth, orderController.getOne);

// Users can create orders (they go to Pending)
router.post('/', auth, orderController.create);

// Only admin can update status / delete
router.put('/:id', auth, adminOnly, orderController.update);
router.delete('/:id', auth, adminOnly, orderController.remove);

module.exports = router;