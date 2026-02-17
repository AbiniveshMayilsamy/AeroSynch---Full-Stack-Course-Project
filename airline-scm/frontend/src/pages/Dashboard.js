import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, Users, TrendingUp, AlertTriangle, Plus, FileText, Settings } from 'lucide-react';
import { storage } from '../utils/localStorage';
import BackgroundVideo from '../components/BackgroundVideo';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Footer from '../components/Footer';
import { initializeDummyData } from '../utils/dummyData';

const Dashboard = () => {
  const { user } = useAuth();
  useScrollReveal();
  
  // Initialize dummy data
  React.useEffect(() => {
    initializeDummyData();
  }, []);

  // Load data from localStorage
  const inventory = storage.getInventory();
  const orders = storage.getOrders();
  const suppliers = storage.getSuppliers();

  const stats = [
    {
      name: 'Total Inventory',
      value: inventory.length || '1,247',
      icon: Package,
      gradient: 'from-blue-500 to-cyan-500',
      change: '+12%'
    },
    {
      name: 'Active Suppliers',
      value: suppliers.length || '89',
      icon: Users,
      gradient: 'from-green-500 to-emerald-500',
      change: '+3%'
    },
    {
      name: 'Pending Orders',
      value: orders.length || '23',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-pink-500',
      change: '-8%'
    },
    {
      name: 'Critical Alerts',
      value: '5',
      icon: AlertTriangle,
      gradient: 'from-orange-500 to-red-500',
      change: '+2'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New inventory item added',
      details: 'Boeing 737 Engine Parts - Quantity: 50',
      time: '2 hours ago',
      type: 'success'
    },
    {
      id: 2,
      action: 'Supplier contract renewed',
      details: 'AeroTech Solutions - 2 year extension',
      time: '5 hours ago',
      type: 'info'
    },
    {
      id: 3,
      action: 'Low stock alert',
      details: 'Hydraulic fluid - Only 15 units remaining',
      time: '1 day ago',
      type: 'warning'
    }
  ];

  return (
    <div className="min-h-screen rough-gradient">
      <BackgroundVideo />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10 scroll-reveal">
          <h1 className="text-5xl font-bold mb-6" style={{color: '#ffffff', textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.4)'}}>
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-400 mt-3 text-lg">
            Here's what's happening with your supply chain today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="shiny-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 scroll-reveal">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400 mb-1">{stat.name}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                      <span className="text-sm text-green-400 font-semibold">{stat.change}</span>
                    </div>
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
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="shiny-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6" style={{color: '#60a5fa', textShadow: '0 0 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.6), 0 0 60px rgba(96, 165, 250, 0.4)'}}>Recent Activities</h3>
              <div className="space-y-5">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                    <div className={`w-3 h-3 rounded-full mt-1.5 ${
                      activity.type === 'success' ? 'bg-green-500 shadow-lg shadow-green-500/50' :
                      activity.type === 'warning' ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50' : 'bg-blue-500 shadow-lg shadow-blue-500/50'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">{activity.details}</p>
                      <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Profile */}
          <div className="space-y-6">
            <div className="shiny-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6" style={{color: '#60a5fa', textShadow: '0 0 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.6), 0 0 60px rgba(96, 165, 250, 0.4)'}}>Quick Actions</h3>
              <div className="space-y-3">
                <button onClick={() => window.location.href='/inventory'} className="w-full btn-primary text-left flex items-center gap-3">
                  <Plus className="h-5 w-5" />
                  Add Inventory Item
                </button>
                <button onClick={() => window.location.href='/orders'} className="w-full btn-secondary text-left flex items-center gap-3">
                  <FileText className="h-5 w-5" />
                  Create Purchase Order
                </button>
                <button onClick={() => window.location.href='/suppliers'} className="w-full glass-card text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-3">
                  <Settings className="h-5 w-5" />
                  Manage Suppliers
                </button>
              </div>
            </div>

            {/* User Info */}
            <div className="shiny-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6" style={{color: '#60a5fa', textShadow: '0 0 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.6), 0 0 60px rgba(96, 165, 250, 0.4)'}}>Your Profile</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <span className="text-sm font-medium text-gray-400 w-24">Name:</span>
                  <span className="text-sm text-white font-semibold">{user?.firstName} {user?.lastName}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <span className="text-sm font-medium text-gray-400 w-24">Email:</span>
                  <span className="text-sm text-white font-semibold">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <span className="text-sm font-medium text-gray-400 w-24">Department:</span>
                  <span className="text-sm text-white font-semibold">{user?.department}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <span className="text-sm font-medium text-gray-400 w-24">Role:</span>
                  <span className="text-sm text-white font-semibold capitalize">{user?.role}</span>
                </div>
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