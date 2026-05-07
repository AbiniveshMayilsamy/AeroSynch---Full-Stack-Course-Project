import React, { useState, useEffect } from 'react';
import { Plus, FileText, Calendar, Trash2, Edit2, CheckCircle, XCircle } from 'lucide-react';
import { orderService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import BackgroundVideo from '../components/BackgroundVideo';

const statusColor = (status) => {
  const map = {
    'Pending':    'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    'Approved':   'bg-green-500/20 text-green-400 border border-green-500/30',
    'Processing': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    'In Transit': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    'Delivered':  'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    'Cancelled':  'bg-gray-500/20 text-gray-400 border border-gray-500/30',
    'Rejected':   'bg-red-500/20 text-red-400 border border-red-500/30',
  };
  return map[status] || 'bg-gray-500/20 text-gray-400';
};

const emptyForm = { orderNumber: '', supplier: '', items: '', quantity: '', deliveryDate: '' };

const Orders = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [noteModal, setNoteModal] = useState(null);
  const [adminNote, setAdminNote] = useState('');

  const fetchOrders = () => {
    setLoading(true);
    orderService.getAll()
      .then(setOrders)
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, []);

  const openCreate = () => { setEditOrder(null); setFormData(emptyForm); setShowModal(true); };
  const openEdit = (o) => {
    setEditOrder(o);
    setFormData({ orderNumber: o.orderNumber, supplier: o.supplier, items: o.items, quantity: o.quantity, deliveryDate: o.deliveryDate, status: o.status });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editOrder) {
        await orderService.update(editOrder.id, formData);
        toast.success('Order updated!');
      } else {
        await orderService.create(formData);
        toast.success('Order submitted for approval!');
      }
      setShowModal(false);
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save order');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this order?')) return;
    try {
      await orderService.remove(id);
      toast.success('Order deleted!');
      fetchOrders();
    } catch { toast.error('Failed to delete order'); }
  };

  const updateStatus = async (id, status) => {
    try {
      await orderService.update(id, { status, adminNote });
      toast.success(`Order ${status}!`);
      setNoteModal(null);
      setAdminNote('');
      fetchOrders();
    } catch { toast.error('Failed to update status'); }
  };

  return (
    <div className="min-h-screen rough-gradient py-12">
      <BackgroundVideo />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-400" style={{ textShadow: '0 0 20px rgba(96,165,250,0.8)' }}>
              {isAdmin ? 'All Purchase Orders' : 'My Purchase Orders'}
            </h1>
            {!isAdmin && <p className="text-gray-400 mt-1 text-sm">Submit orders for admin approval</p>}
          </div>
          <button onClick={openCreate} className="btn-primary flex items-center gap-2">
            <Plus className="h-5 w-5" /> Create Order
          </button>
        </div>

        {/* Status summary for admin */}
        {isAdmin && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {['Pending', 'Approved', 'In Transit', 'Delivered'].map(s => (
              <div key={s} className="shiny-card rounded-xl p-4 text-center">
                <p className={`text-2xl font-bold ${statusColor(s).split(' ')[1]}`}>
                  {orders.filter(o => o.status === s).length}
                </p>
                <p className="text-gray-400 text-xs mt-1">{s}</p>
              </div>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            No orders found.{' '}
            <button onClick={openCreate} className="text-blue-400 underline">Create your first order</button>
          </div>
        ) : (
          <div className="shiny-card rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">Order #</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">Supplier</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">Items</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">Qty</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">Delivery</th>
                    {isAdmin && <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">Requested By</th>}
                    <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">Status</th>
                    <th className="text-left px-6 py-4 text-gray-400 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                      <td className="px-6 py-4 text-white font-mono text-sm">#{order.orderNumber}</td>
                      <td className="px-6 py-4 text-gray-300 text-sm">{order.supplier}</td>
                      <td className="px-6 py-4 text-gray-300 text-sm">{order.items}</td>
                      <td className="px-6 py-4 text-white font-semibold text-sm">{order.quantity}</td>
                      <td className="px-6 py-4 text-gray-300 text-sm flex items-center gap-1">
                        <Calendar className="h-3 w-3" />{order.deliveryDate}
                      </td>
                      {isAdmin && (
                        <td className="px-6 py-4 text-gray-300 text-sm">{order.createdByName || 'N/A'}</td>
                      )}
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor(order.status)}`}>
                          {order.status}
                        </span>
                        {order.adminNote && (
                          <p className="text-xs text-gray-500 mt-1 italic">"{order.adminNote}"</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {/* Admin: approve/reject pending orders */}
                          {isAdmin && order.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => updateStatus(order.id, 'Approved')}
                                className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/40 text-green-400 transition-all"
                                title="Approve"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => { setNoteModal(order.id); setAdminNote(''); }}
                                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-all"
                                title="Reject"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          {/* Admin: edit status of any order */}
                          {isAdmin && (
                            <button onClick={() => openEdit(order)} className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 transition-all" title="Edit">
                              <Edit2 className="h-4 w-4" />
                            </button>
                          )}
                          {/* Admin: delete */}
                          {isAdmin && (
                            <button onClick={() => handleDelete(order.id)} className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-all" title="Delete">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="shiny-card rounded-3xl p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-6 text-blue-400" style={{ textShadow: '0 0 20px rgba(96,165,250,0.8)' }}>
                {editOrder ? 'Edit Order' : 'Create Purchase Order'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Order Number (e.g. PO-2024-001)" className="input-field" value={formData.orderNumber} onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })} required />
                <input type="text" placeholder="Supplier Name" className="input-field" value={formData.supplier} onChange={(e) => setFormData({ ...formData, supplier: e.target.value })} required />
                <input type="text" placeholder="Items Description" className="input-field" value={formData.items} onChange={(e) => setFormData({ ...formData, items: e.target.value })} required />
                <input type="number" placeholder="Quantity" className="input-field" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} required />
                <input type="date" className="input-field" value={formData.deliveryDate} onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })} required />
                {/* Admin can change status */}
                {isAdmin && editOrder && (
                  <select className="input-field" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                    {['Pending','Approved','Processing','In Transit','Delivered','Cancelled','Rejected'].map(s => (
                      <option key={s} value={s} className="bg-gray-900">{s}</option>
                    ))}
                  </select>
                )}
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-primary flex-1">{editOrder ? 'Update' : 'Submit Order'}</button>
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reject Note Modal */}
        {noteModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="shiny-card rounded-3xl p-8 max-w-sm w-full mx-4">
              <h2 className="text-xl font-bold mb-4 text-red-400">Reject Order</h2>
              <textarea
                className="input-field mb-4"
                rows="3"
                placeholder="Reason for rejection (optional)"
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
              />
              <div className="flex gap-3">
                <button onClick={() => updateStatus(noteModal, 'Rejected')} className="btn-primary flex-1 bg-red-600 hover:bg-red-700">Reject</button>
                <button onClick={() => setNoteModal(null)} className="btn-secondary flex-1">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;