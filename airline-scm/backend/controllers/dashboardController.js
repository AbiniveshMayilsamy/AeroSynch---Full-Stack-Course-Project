const { User, Inventory, Supplier, Order } = require('../models');

exports.getStats = async (req, res) => {
  try {
    const [totalInventory, activeSuppliers, systemUsers, pendingOrders, lowStock, recentOrders] = await Promise.all([
      Inventory.count(),
      Supplier.count({ where: { contractStatus: 'active' } }),
      User.count({ where: { isActive: true } }),
      Order.count({ where: { status: 'Pending' } }),
      Inventory.count({ where: { status: 'low-stock' } }),
      Order.findAll({ limit: 5, order: [['createdAt', 'DESC']] })
    ]);

    res.json({
      stats: { totalInventory, activeSuppliers, systemUsers, pendingOrders, lowStock },
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};