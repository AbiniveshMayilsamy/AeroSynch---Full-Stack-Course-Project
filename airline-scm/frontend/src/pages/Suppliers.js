import React, { useState, useEffect } from 'react';
import { Plus, Users, Mail, Phone, Trash2, Edit2 } from 'lucide-react';
import { supplierService } from '../services/authService';
import toast from 'react-hot-toast';
import BackgroundVideo from '../components/BackgroundVideo';

const contractColor = (status) => {
  if (status === 'active') return 'bg-green-500/20 text-green-400';
  if (status === 'expired') return 'bg-red-500/20 text-red-400';
  return 'bg-yellow-500/20 text-yellow-400';
};

const emptyForm = { name: '', email: '', phone: '', address: '', category: '', contractStatus: 'active', contractExpiry: '' };

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const fetchSuppliers = () => {
    setLoading(true);
    supplierService.getAll()
      .then(setSuppliers)
      .catch(() => toast.error('Failed to load suppliers'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchSuppliers(); }, []);

  const openCreate = () => { setEditSupplier(null); setFormData(emptyForm); setShowModal(true); };
  const openEdit = (s) => { setEditSupplier(s); setFormData({ name: s.name, email: s.email, phone: s.phone || '', address: s.address || '', category: s.category, contractStatus: s.contractStatus, contractExpiry: s.contractExpiry || '' }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editSupplier) {
        await supplierService.update(editSupplier.id, formData);
        toast.success('Supplier updated!');
      } else {
        await supplierService.create(formData);
        toast.success('Supplier added!');
      }
      setShowModal(false);
      fetchSuppliers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save supplier');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this supplier?')) return;
    try {
      await supplierService.remove(id);
      toast.success('Supplier deleted!');
      fetchSuppliers();
    } catch {
      toast.error('Failed to delete supplier');
    }
  };

  return (
    <div className="min-h-screen rough-gradient py-12">
      <BackgroundVideo />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400" style={{ textShadow: '0 0 20px rgba(96,165,250,0.8)' }}>
            Manage Suppliers
          </h1>
          <button onClick={openCreate} className="btn-primary flex items-center gap-2">
            <Plus className="h-5 w-5" /> Add Supplier
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading suppliers...</div>
        ) : suppliers.length === 0 ? (
          <div className="text-center text-gray-400 py-20">No suppliers found. Add your first supplier!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="shiny-card rounded-2xl p-6 group relative">
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(supplier)} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(supplier.id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{supplier.name}</h3>
                </div>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p className="flex items-center gap-2"><Mail className="h-4 w-4" /><span className="text-white">{supplier.email}</span></p>
                  <p className="flex items-center gap-2"><Phone className="h-4 w-4" /><span className="text-white">{supplier.phone}</span></p>
                  <p>Category: <span className="text-white font-semibold">{supplier.category}</span></p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${contractColor(supplier.contractStatus)}`}>
                    {supplier.contractStatus}
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
                {editSupplier ? 'Edit Supplier' : 'Add Supplier'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Supplier Name" className="input-field" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                <input type="email" placeholder="Email" className="input-field" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                <input type="tel" placeholder="Phone" className="input-field" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                <input type="text" placeholder="Address" className="input-field" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                <input type="text" placeholder="Category" className="input-field" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
                <select className="input-field" value={formData.contractStatus} onChange={(e) => setFormData({ ...formData, contractStatus: e.target.value })}>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="pending">Pending</option>
                </select>
                <input type="date" placeholder="Contract Expiry" className="input-field" value={formData.contractExpiry} onChange={(e) => setFormData({ ...formData, contractExpiry: e.target.value })} />
                <div className="flex gap-3">
                  <button type="submit" className="btn-primary flex-1">{editSupplier ? 'Update' : 'Add Supplier'}</button>
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