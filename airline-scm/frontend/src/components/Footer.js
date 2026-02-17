import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import logo from '../utils/about.png';

const Footer = () => {
return (
<footer className="glass-card border-t border-white/10 mt-20">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
{/* College Info */}
<div className="col-span-1 md:col-span-2">
<img src={logo} alt="SECE Logo" className="h-16 w-auto mb-4 rounded-lg" />
<h3 className="text-xl font-bold text-white mb-3">Sri Eshwar College of Engineering</h3>
<p className="text-gray-400 mb-4 leading-relaxed">
Department of Computer Science and Engineering
</p>
<div className="space-y-2">
<div className="flex items-start gap-2 text-gray-400">
<MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
<span>Kinathukadavu, Coimbatore - 641 202, Tamil Nadu, India</span>
</div>
<div className="flex items-center gap-2 text-gray-400">
<Phone className="h-5 w-5 text-blue-400" />
<span>+91 422 2687000</span>
</div>
<div className="flex items-center gap-2 text-gray-400">
<Mail className="h-5 w-5 text-blue-400" />
<span>info@sece.ac.in</span>
</div>
</div>
</div>

{/* Quick Links */}
<div>
<h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
<ul className="space-y-2">
<li>
<Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
</li>
<li>
<a href="/#about" className="text-gray-400 hover:text-white transition-colors">About</a>
</li>
<li>
<a href="/#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
</li>
<li>
<Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
</li>
</ul>
</div>

{/* Resources */}
<div>
<h4 className="text-lg font-bold text-white mb-4">Resources</h4>
<ul className="space-y-2">
<li>
<a href="https://sece.ac.in" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1">
College Website
<ExternalLink className="h-3 w-3" />
</a>
</li>
<li>
<a href="https://sece.ac.in/cse" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1">
CSE Department
<ExternalLink className="h-3 w-3" />
</a>
</li>
<li>
<Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link>
</li>
<li>
<Link to="/register" className="text-gray-400 hover:text-white transition-colors">Register</Link>
</li>
</ul>
</div>
</div>

<div className="border-t border-white/10 mt-8 pt-8 text-center">
<p className="text-gray-400 text-sm">
© {new Date().getFullYear()} AeroSynch - Full Stack Development Project | Sri Eshwar College of Engineering
</p>
<p className="text-gray-500 text-xs mt-2">
Developed as part of Full Stack Development Course
</p>
</div>
</div>
</footer>
);
};

export default Footer;
