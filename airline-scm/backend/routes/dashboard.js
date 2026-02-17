const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ 
    stats: {
      totalInventory: 1247,
      activeSuppliers: 89,
      pendingOrders: 23,
      systemUsers: 156
    }
  });
});

module.exports = router;