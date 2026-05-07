import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, Users, TrendingUp, AlertTriangle, Plus, FileText, Settings, ShieldCheck } from 'lucide-react';
import { dashboardService, orderService } from '../services/authService';
import BackgroundVideo from '../components/BackgroundVideo';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

const statusColor = (status) => {
  const map = {
    'Pending':    'text-orange-400',
    'Approved':   'text-green-400',
    'Processing': 'text-yellow-400',
    'In Transit': 'text-blue-400',
    'Delivered':  'text-emerald-400',
    'Cancelled':  'text-gray-400',
    'Rejected':   'text-red-400',
  };
  return map[status] || 'text-gray-400';
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';
  const [stats, setStats] = useState({ totalInventory: 0, activeSuppliers: 0, systemUsers: 0, pendingOrders: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAdmin) {
          const data = await dashboardService.getStats();
          setStats(data.stats);
          setRecentOrders(data.recentOrders || []);
        } else {
          // Regular user: fetch their own orders
          const orders = await orderService.getAll();
          setRecentOrders(orders.slice(0, 5));
          setStats(prev => ({ ...prev, pendingOrders: orders.filter(o => o.status === 'Pending').length }));
        }
      } catch {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAdmin]);

  // Admin stat cards
  const adminStats = [
    { name: 'Total Inventory', value: stats.totalInventory, icon: Package, gradient: 'from-blue-500 to-cyan-500', link: '/inventory' },
    { name: 'Active Suppliers', value: stats.activeSuppliers, icon: Users, gradient: 'from-green-500 to-emerald-500', link: '/suppliers' },
    { name: 'Pending Orders', value: stats.pendingOrders, icon: TrendingUp, gradient: 'from-orange-500 to-red-500', link: '/orders' },
    { name: 'System Users', value: stats.systemUsers, icon: AlertTriangle, gradient: 'from-purple-500 to-pink-500', link: '/admin/users' },
  ];

  // User stat cards
  const userStats = [
    { name: 'My Orders', value: recentOrders.length, icon: FileText, gradient: 'from-blue-500 to-cyan-500', link: '/orders' },
    { name: 'Pending Approval', value: stats.pendingOrders, icon: TrendingUp, gradient: 'from-orange-500 to-red-500', link: '/orders' },
    { name: 'Approved', value: recentOrders.filter(o => o.status === 'Approved').length, icon: Package, gradient: 'from-green-500 to-emerald-500', link: '/orders' },
    { name: 'Delivered', value: recentOrders.filter(o => o.status === 'Delivered').length, icon: AlertTriangle, gradient: 'from-purple-500 to-pink-500', link: '/orders' },
  ];

  const statCards = isAdmin ? adminStats : userStats;

  return (
    <div className="min-h-screen rough-gradient">
      <BackgroundVideo />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-5xl font-bold text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.6)' }}>
              Welcome, {user?.firstName}!
            </h1>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${isAdmin ? 'bg-purple-500/30 text-purple-300 border border-purple-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/20'}`}>
              {isAdmin ? '⚡ Admin' : '👤 User'}
            </span>
          </div>
          <p className="text-gray-400 text-lg">
            {isAdmin ? 'Full system control — manage inventory, approve orders, and oversee operations.' : 'View your orders, track deliveries, and submit new purchase requests.'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} onClick={() => navigate(stat.link)} className="shiny-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400 mb-1">{stat.name}</p>
                    <p className="text-3xl font-bold text-white">{loading ? '...' : stat.value}</p>
                  </div>
                  <div className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-xl`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="shiny-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-blue-400" style={{ textShadow: '0 0 20px rgba(96,165,250,0.8)' }}>
                {isAdmin ? 'Recent Orders (All Users)' : 'My Recent Orders'}
              </h3>
              {loading ? (
                <p className="text-gray-400">Loading...</p>
              ) : recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-3">No orders yet.</p>
                  <button onClick={() => navigate('/orders')} className="btn-primary text-sm">Create First Order</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                      <div>
                        <p className="text-sm font-semibold text-white font-mono">#{order.orderNumber}</p>
                        <p className="text-xs text-gray-400">{order.supplier} — {order.items}</p>
                        {isAdmin && order.createdByName && (
                          <p className="text-xs text-purple-400 mt-0.5">by {order.createdByName}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-bold ${statusColor(order.status)}`}>{order.status}</span>
                        <p className="text-xs text-gray-500 mt-0.5">Qty: {order.quantity}</p>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => navigate('/orders')} className="w-full text-center text-blue-400 text-sm hover:text-blue-300 mt-2 py-2">
                    View all orders →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="shiny-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-blue-400" style={{ textShadow: '0 0 20px rgba(96,165,250,0.8)' }}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button onClick={() => navigate('/orders')} className="w-full btn-primary text-left flex items-center gap-3">
                  <Plus className="h-5 w-5" /> Create Purchase Order
                </button>
                {isAdmin && (
                  <>
                    <button onClick={() => navigate('/inventory')} className="w-full btn-secondary text-left flex items-center gap-3">
                      <Package className="h-5 w-5" /> Manage Inventory
                    </button>
                    <button onClick={() => navigate('/suppliers')} className="w-full btn-secondary text-left flex items-center gap-3">
                      <Settings className="h-5 w-5" /> Manage Suppliers
                    </button>
                    <button onClick={() => navigate('/admin/users')} className="w-full text-left flex items-center gap-3 px-6 py-3 rounded-xl font-semibold bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/20 transition-all">
                      <ShieldCheck className="h-5 w-5" /> Manage Users
                    </button>
                  </>
                )}
                {!isAdmin && (
                  <button onClick={() => navigate('/inventory')} className="w-full btn-secondary text-left flex items-center gap-3">
                    <Package className="h-5 w-5" /> View Inventory
                  </button>
                )}
              </div>
            </div>

            {/* Profile Card */}
            <div className="shiny-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-blue-400" style={{ textShadow: '0 0 20px rgba(96,165,250,0.8)' }}>
                Your Profile
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Name', value: `${user?.firstName} ${user?.lastName}` },
                  { label: 'Email', value: user?.email },
                  { label: 'Dept', value: user?.department },
                  { label: 'Role', value: user?.role },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                    <span className="text-sm font-medium text-gray-400 w-14">{label}:</span>
                    <span className="text-sm text-white font-semibold capitalize">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;