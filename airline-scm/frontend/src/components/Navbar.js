import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, LayoutDashboard, Package, FileText, Users, ShieldCheck, Menu, X } from 'lucide-react';
import logo from '../utils/logo.png';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => { logout(); navigate('/'); };

  const navLink = (to, label, Icon) => (
    <Link key={to} to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-medium text-sm
        ${location.pathname === to ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
      onClick={() => setMenuOpen(false)}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {label}
    </Link>
  );

  return (
    <nav className="glass-card border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Logo" className="h-10 w-24 rounded-xl object-cover group-hover:scale-110 transition-transform duration-300 shadow-lg" />
            <span className="text-xl font-bold text-white">AEROSYNCH</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {navLink('/dashboard', 'Dashboard', LayoutDashboard)}
                {navLink('/inventory', 'Inventory', Package)}
                {navLink('/orders', 'Orders', FileText)}
                {navLink('/suppliers', 'Suppliers', Users)}
                {/* Admin only */}
                {isAdmin && navLink('/admin/users', 'Manage Users', ShieldCheck)}

                {/* Role badge */}
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold ${isAdmin ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30' : 'bg-blue-600/20 text-blue-300 border border-blue-500/20'}`}>
                  <User className="h-3 w-3" />
                  {user?.firstName} · {isAdmin ? 'Admin' : 'User'}
                </div>

                <button onClick={handleLogout} className="flex items-center gap-2 text-gray-300 hover:text-red-400 px-4 py-2 rounded-xl hover:bg-white/10 transition-all font-medium text-sm">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <a href="/#about" className="text-gray-300 hover:text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all font-medium text-sm">About</a>
                <a href="/#contact" className="text-gray-300 hover:text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all font-medium text-sm">Contact</a>
                <Link to="/login" className="text-gray-300 hover:text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all font-medium text-sm">Login</Link>
                <Link to="/register" className="btn-primary text-sm">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                {navLink('/dashboard', 'Dashboard', LayoutDashboard)}
                {navLink('/inventory', 'Inventory', Package)}
                {navLink('/orders', 'Orders', FileText)}
                {navLink('/suppliers', 'Suppliers', Users)}
                {isAdmin && navLink('/admin/users', 'Manage Users', ShieldCheck)}
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 px-4 py-2 rounded-xl hover:bg-white/10 transition-all font-medium text-sm">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 px-4 py-2" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn-primary text-sm" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;