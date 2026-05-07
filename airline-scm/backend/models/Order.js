const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  orderNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
  supplier: { type: DataTypes.STRING, allowNull: false },
  items: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  deliveryDate: { type: DataTypes.DATEONLY, allowNull: false },
  status: {
    type: DataTypes.ENUM('Pending', 'Approved', 'Processing', 'In Transit', 'Delivered', 'Cancelled', 'Rejected'),
    defaultValue: 'Pending'
  },
  createdBy: { type: DataTypes.UUID, allowNull: true },
  createdByName: { type: DataTypes.STRING, allowNull: true },
  adminNote: { type: DataTypes.TEXT, allowNull: true }
}, { tableName: 'orders' });

module.exports = Order;