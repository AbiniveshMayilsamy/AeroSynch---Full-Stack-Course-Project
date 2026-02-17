import React, { useState } from 'react';
import { Plus, Users, Mail, Phone } from 'lucide-react';
import { storage } from '../utils/localStorage';
import toast from 'react-hot-toast';
import BackgroundVideo from '../components/BackgroundVideo';
import { initializeDummyData } from '../utils/dummyData';

const Suppliers = () => {
  // Initialize dummy data on mount
  React.useEffect(() => {
    initializeDummyData();
    setSuppliers(storage.getSuppliers());
  }, []);
  
  const [suppliers, setSuppliers] = useState(storage.getSuppliers());
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSupplier = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date()
    };
    const updated = [...suppliers, newSupplier];
    setSuppliers(updated);
    storage.setSuppliers(updated);
    setShowModal(false);
    setFormData({ name: '', email: '', phone: '', category: '' });
    toast.success('Supplier added!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      const updated = suppliers.filter(supplier => supplier.id !== id);
      setSuppliers(updated);
      storage.setSuppliers(updated);
      toast.success('Supplier deleted!');
    }
  };

  return (
    <div className="min-h-screen rough-gradient py-12">
      <BackgroundVideo />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold" style={{color: '#60a5fa', textShadow: '0 0 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.6), 0 0 60px rgba(96, 165, 250, 0.4)'}}>Manage Suppliers</h1>
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Supplier
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="shiny-card rounded-2xl p-6 relative group">
              <button
                onClick={() => handleDelete(supplier.id)}
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                title="Delete Supplier"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{supplier.name}</h3>
              </div>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-white">{supplier.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-white">{supplier.phone}</span>
                </p>
                <p>Category: <span className="text-white font-semibold">{supplier.category}</span></p>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="shiny-card rounded-3xl p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#60a5fa', textShadow: '0 0 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.6), 0 0 60px rgba(96, 165, 250, 0.4)'}}>Add Supplier</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Supplier Name"
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input-field"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="input-field"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                <div className="flex gap-3">
                  <button type="submit" className="btn-primary flex-1">Add Supplier</button>
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

export default Suppliers;
