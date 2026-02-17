import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plane, LogOut, User, LayoutDashboard } from 'lucide-react';
import logo from '../utils/logo.png';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-card border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={logo} alt="Logo" className="h-10 w-24 rounded-xl object-cover group-hover:scale-110 transition-transform duration-300 shadow-lg animate-pulse-slow" />
              <span className="text-xl font-bold text-white animate-fade-in">
                AEROSYNCH
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-300 hover:text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all font-medium"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to="/inventory"
                  className="flex items-center gap-2 text-gray-300 hover:text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all font-medium"
                >
                  Inventory
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center gap-2 text-gray-300 hover:text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all font-medium"
                >
                  Orders
                </Link>
                <Link
                  to="/suppliers"
                  className="flex items-center gap-2 text-gray-300 hover:text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all font-medium"
                >
                  Suppliers
                </Link>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5">
                  <User className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-white font-medium">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-300 hover:text-red-400 px-4 py-2 rounded-xl hover:bg-white/10 transition-all font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <a
                  href="/#about"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all font-medium"
                >
                  About
                </a>
                <a
                  href="/#contact"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all font-medium"
                >
                  Contact
                </a>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;