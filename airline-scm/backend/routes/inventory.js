const express = require('express');
const router = express.Router();

// Placeholder routes - will be implemented
router.get('/', (req, res) => {
  res.json({ message: 'Inventory routes' });
});

module.exports = router;