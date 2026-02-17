const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  partNumber: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['engine', 'avionics', 'hydraulics', 'electrical', 'structural', 'consumables']
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  minStock: {
    type: Number,
    required: true,
    default: 10
  },
  unitPrice: {
    type: Number,
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['in-stock', 'low-stock', 'out-of-stock', 'on-order'],
    default: 'in-stock'
  }
}, {
  timestamps: true
});

// Update status based on quantity
inventorySchema.pre('save', function(next) {
  if (this.quantity === 0) {
    this.status = 'out-of-stock';
  } else if (this.quantity <= this.minStock) {
    this.status = 'low-stock';
  } else {
    this.status = 'in-stock';
  }
  next();
});

module.exports = mongoose.model('Inventory', inventorySchema);