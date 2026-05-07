const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

router.get('/', auth, inventoryController.getAll);
router.get('/:id', auth, inventoryController.getOne);
router.post('/', auth, adminOnly, inventoryController.create);
router.put('/:id', auth, adminOnly, inventoryController.update);
router.delete('/:id', auth, adminOnly, inventoryController.remove);

module.exports = router;