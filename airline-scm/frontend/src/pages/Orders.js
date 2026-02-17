import React, { useState } from 'react';
import { Plus, FileText, Calendar } from 'lucide-react';
import { storage } from '../utils/localStorage';
import toast from 'react-hot-toast';
import BackgroundVideo from '../components/BackgroundVideo';
import { initializeDummyData } from '../utils/dummyData';

const Orders = () => {
  // Initialize dummy data on mount
  React.useEffect(() => {
    initializeDummyData();
    setOrders(storage.getOrders());
  }, []);
  
  const [orders, setOrders] = useState(storage.getOrders());
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    orderNumber: '',
    supplier: '',
    items: '',
    quantity: '',
    deliveryDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: Date.now().toString(),
      ...formData,
      status: 'Pending',
      createdAt: new Date()
    };
    const updated = [...orders, newOrder];
    setOrders(updated);
    storage.setOrders(updated);
    setShowModal(false);
    setFormData({ orderNumber: '', supplier: '', items: '', quantity: '', deliveryDate: '' });
    toast.success('Purchase order created!');
  };

  return (
    <div className="min-h-screen rough-gradient py-12">
      <BackgroundVideo />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold" style={{color: '#60a5fa', textShadow: '0 0 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.6), 0 0 60px rgba(96, 165, 250, 0.4)'}}>Purchase Orders</h1>
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create Order
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="shiny-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">#{order.orderNumber}</h3>
              </div>
              <div className="space-y-2 text-gray-300">
                <p>Supplier: <span className="text-white font-semibold">{order.supplier}</span></p>
                <p>Items: <span className="text-white font-semibold">{order.items}</span></p>
                <p>Quantity: <span className="text-white font-semibold">{order.quantity}</span></p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-white">{order.deliveryDate}</span>
                </p>
                <p>Status: <span className="text-yellow-400 font-semibold">{order.status}</span></p>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="shiny-card rounded-3xl p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#60a5fa', textShadow: '0 0 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.6), 0 0 60px rgba(96, 165, 250, 0.4)'}}>Create Purchase Order</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Order Number"
                  className="input-field"
                  value={formData.orderNumber}
                  onChange={(e) => setFormData({...formData, orderNumber: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Supplier Name"
                  className="input-field"
                  value={formData.supplier}
                  onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Items"
                  className="input-field"
                  value={formData.items}
                  onChange={(e) => setFormData({...formData, items: e.target.value})}
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
                  type="date"
                  placeholder="Delivery Date"
                  className="input-field"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                  required
                />
                <div className="flex gap-3">
                  <button type="submit" className="btn-primary flex-1">Create Order</button>
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

export default Orders;
