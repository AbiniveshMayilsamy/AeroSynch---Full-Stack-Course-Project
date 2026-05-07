const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Inventory = sequelize.define('Inventory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  partNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('engine', 'avionics', 'hydraulics', 'electrical', 'structural', 'consumables'),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  minStock: {
    type: DataTypes.INTEGER,
    defaultValue: 10
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  supplierId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('in-stock', 'low-stock', 'out-of-stock', 'on-order'),
    defaultValue: 'in-stock'
  }
}, {
  tableName: 'inventory',
  hooks: {
    beforeSave: (item) => {
      if (item.quantity === 0) item.status = 'out-of-stock';
      else if (item.quantity <= item.minStock) item.status = 'low-stock';
      else item.status = 'in-stock';
    }
  }
});

module.exports = Inventory;