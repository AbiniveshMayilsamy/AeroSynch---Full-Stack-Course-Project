import React, { useState } from 'react';
import { Plus, Package, Search } from 'lucide-react';
import { storage } from '../utils/localStorage';
import toast from 'react-hot-toast';
import BackgroundVideo from '../components/BackgroundVideo';
import { initializeDummyData } from '../utils/dummyData';

const Inventory = () => {
  // Initialize dummy data on mount
  React.useEffect(() => {
    initializeDummyData();
    setInventory(storage.getInventory());
  }, []);
  
  const [inventory, setInventory] = useState(storage.getInventory());
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    category: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date()
    };
    const updated = [...inventory, newItem];
    setInventory(updated);
    storage.setInventory(updated);
    setShowModal(false);
    setFormData({ name: '', quantity: '', category: '', location: '' });
    toast.success('Inventory item added!');
  };

  return (
    <div className="min-h-screen rough-gradient py-12">
      <BackgroundVideo />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold" style={{color: '#60a5fa', textShadow: '0 0 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.6), 0 0 60px rgba(96, 165, 250, 0.4)'}}>Inventory Management</h1>
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Item
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inventory.map((item) => (
            <div key={item.id} className="shiny-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{item.name}</h3>
              </div>
              <div className="space-y-2 text-gray-300">
                <p>Quantity: <span className="text-white font-semibold">{item.quantity}</span></p>
                <p>Category: <span className="text-white font-semibold">{item.category}</span></p>
                <p>Location: <span className="text-white font-semibold">{item.location}</span></p>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="shiny-card rounded-3xl p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#60a5fa', textShadow: '0 0 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.6), 0 0 60px rgba(96, 165, 250, 0.4)'}}>Add Inventory Item</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Item Name"
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  className="input-field"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  className="input-field"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="input-field"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
                <div className="flex gap-3">
                  <button type="submit" className="btn-primary flex-1">Add Item</button>
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
