import React, { useState, useEffect } from 'react';
import { Plus, Package, Trash2, Edit2 } from 'lucide-react';
import { inventoryService } from '../services/authService';
import toast from 'react-hot-toast';
import BackgroundVideo from '../components/BackgroundVideo';

const statusColor = (status) => {
  if (status === 'in-stock') return 'bg-green-500/20 text-green-400';
  if (status === 'low-stock') return 'bg-yellow-500/20 text-yellow-400';
  if (status === 'out-of-stock') return 'bg-red-500/20 text-red-400';
  return 'bg-blue-500/20 text-blue-400';
};

const emptyForm = { partNumber: '', name: '', category: 'engine', quantity: '', minStock: 10, unitPrice: '', location: '' };

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const fetchInventory = () => {
    setLoading(true);
    inventoryService.getAll()
      .then(setInventory)
      .catch(() => toast.error('Failed to load inventory'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchInventory(); }, []);

  const openCreate = () => { setEditItem(null); setFormData(emptyForm); setShowModal(true); };
  const openEdit = (item) => { setEditItem(item); setFormData({ partNumber: item.partNumber, name: item.name, category: item.category, quantity: item.quantity, minStock: item.minStock, unitPrice: item.unitPrice, location: item.location }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await inventoryService.update(editItem.id, formData);
        toast.success('Item updated!');
      } else {
        await inventoryService.create(formData);
        toast.success('Item added!');
      }
      setShowModal(false);
      fetchInventory();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save item');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await inventoryService.remove(id);
      toast.success('Item deleted!');
      fetchInventory();
    } catch {
      toast.error('Failed to delete item');
    }
  };

  return (
    <div className="min-h-screen rough-gradient py-12">
      <BackgroundVideo />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400" style={{ textShadow: '0 0 20px rgba(96,165,250,0.8)' }}>
            Inventory Management
          </h1>
          <button onClick={openCreate} className="btn-primary flex items-center gap-2">
            <Plus className="h-5 w-5" /> Add Item
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading inventory...</div>
        ) : inventory.length === 0 ? (
          <div className="text-center text-gray-400 py-20">No inventory items found. Add your first item!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inventory.map((item) => (
              <div key={item.id} className="shiny-card rounded-2xl p-6 group relative">
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(item)} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                    <p className="text-xs text-gray-400">{item.partNumber}</p>
                  </div>
                </div>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p>Quantity: <span className="text-white font-semibold">{item.quantity}</span></p>
                  <p>Category: <span className="text-white font-semibold capitalize">{item.category}</span></p>
                  <p>Location: <span className="text-white font-semibold">{item.location}</span></p>
                  <p>Unit Price: <span className="text-white font-semibold">${item.unitPrice}</span></p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${statusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="shiny-card rounded-3xl p-8 max-w-md w-full mx-4 max-h-screen overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-blue-400" style={{ textShadow: '0 0 20px rgba(96,165,250,0.8)' }}>
                {editItem ? 'Edit Item' : 'Add Inventory Item'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Part Number (e.g. PN-001)" className="input-field" value={formData.partNumber} onChange={(e) => setFormData({ ...formData, partNumber: e.target.value })} required />
                <input type="text" placeholder="Item Name" className="input-field" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                <select className="input-field" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                  {['engine', 'avionics', 'hydraulics', 'electrical', 'structural', 'consumables'].map(c => (
                    <option key={c} value={c} className="capitalize">{c}</option>
                  ))}
                </select>
                <input type="number" placeholder="Quantity" className="input-field" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} required />
                <input type="number" placeholder="Min Stock Level" className="input-field" value={formData.minStock} onChange={(e) => setFormData({ ...formData, minStock: e.target.value })} required />
                <input type="number" placeholder="Unit Price ($)" className="input-field" value={formData.unitPrice} onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })} required />
                <input type="text" placeholder="Location (e.g. Warehouse A)" className="input-field" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
                <div className="flex gap-3">
                  <button type="submit" className="btn-primary flex-1">{editItem ? 'Update' : 'Add Item'}</button>
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;