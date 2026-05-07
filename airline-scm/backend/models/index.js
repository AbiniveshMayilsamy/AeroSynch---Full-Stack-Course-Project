const sequelize = require('../config/database');
const User = require('./User');
const Supplier = require('./Supplier');
const Inventory = require('./Inventory');
const Order = require('./Order');

Supplier.hasMany(Inventory, { foreignKey: 'supplierId', as: 'inventoryItems' });
Inventory.belongsTo(Supplier, { foreignKey: 'supplierId', as: 'supplier' });

module.exports = { sequelize, User, Supplier, Inventory, Order };