import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Shield, BarChart3, Package, Truck, Sparkles, Zap, Globe, MapPin, ExternalLink, GraduationCap } from 'lucide-react';
import logo from '../utils/logo.png';
import homeVideo from '../utils/7895-205257266_small.mp4';
import aboutImg from '../utils/about.png';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Footer from '../components/Footer';
import { initializeDummyData } from '../utils/dummyData';

const Home = () => {
  const { isAuthenticated } = useAuth();
  useScrollReveal();
  
  // Initialize dummy data on component mount
  React.useEffect(() => {
    initializeDummyData();
  }, []);

  return (
    <div className="min-h-screen rough-gradient">
      <div className="fixed inset-0 pointer-events-none z-0">
      </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <img src={logo} alt="Background Logo" className="w-full h-full object-cover" />
        </div>
        {/* Animated Diamond Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="diamond diamond-1"></div>
          <div className="diamond diamond-2"></div>
          <div className="diamond diamond-3"></div>
          <div className="diamond diamond-4"></div>
          <div className="diamond diamond-5"></div>
          <div className="diamond diamond-6"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center text-white scroll-reveal mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Sparkles className="h-4 w-4 text-blue-300" />
              <span className="text-sm font-medium">Next-Gen Supply Chain</span>
            </div>
            <h1 className="text-8xl font-bold mb-6 leading-tight fade-in" style={{fontFamily: 'Exo 2, sans-serif', fontWeight: '800', letterSpacing: '0.02em'}}>
              <span className="text-white" style={{textShadow: '0 0 40px rgba(255, 255, 255, 0.9), 0 0 80px rgba(255, 255, 255, 0.7), 0 0 120px rgba(255, 255, 255, 0.5)'}}>AEROSYNCH</span>
            </h1>
            <h2 className="text-6xl font-bold mb-6 fade-in delay-1" style={{fontFamily: 'Rajdhani, sans-serif', fontWeight: '700'}}>
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-slate-300 bg-clip-text text-transparent glow-text">Airline Supply Chain Management</span>
            </h2>
            <p className="text-xl mb-8 text-gray-300 leading-relaxed fade-in delay-3 max-w-3xl mx-auto" style={{fontFamily: 'Rajdhani, sans-serif', fontWeight: '500'}}>
              Streamline aviation operations with cutting-edge supply chain management. 
              Intelligent logistics and real-time optimization.
            </p>
            <div className="flex flex-wrap gap-4 fade-in delay-4 justify-center">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn-primary inline-flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn-primary inline-flex items-center gap-2">
                    Get Started
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link to="/login" className="glass-card text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 floating scroll-reveal delay-1 max-w-5xl mx-auto">
            <div className="shiny-card rounded-2xl p-6 text-center text-white transform hover:scale-105 transition-all duration-300">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">99.2%</h3>
              <p className="text-gray-300 mt-2">On-Time Performance</p>
            </div>
            <div className="shiny-card rounded-2xl p-6 text-center text-white transform hover:scale-105 transition-all duration-300">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">15M+</h3>
              <p className="text-gray-300 mt-2">Parts Managed</p>
            </div>
            <div className="shiny-card rounded-2xl p-6 text-center text-white transform hover:scale-105 transition-all duration-300">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">500+</h3>
              <p className="text-gray-300 mt-2">Suppliers</p>
            </div>
            <div className="shiny-card rounded-2xl p-6 text-center text-white transform hover:scale-105 transition-all duration-300">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">24/7</h3>
              <p className="text-gray-300 mt-2">Operations</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20"
            style={{filter: 'blur(2px)'}}
          >
            <source src={homeVideo} type="video/mp4" />
          </video>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-5xl font-bold mb-4" style={{color: '#60a5fa', textShadow: '0 0 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.6), 0 0 60px rgba(96, 165, 250, 0.4)'}}>
              Comprehensive Supply Chain Solutions
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              End-to-end visibility and control over your aviation operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="shiny-card rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300 scroll-reveal animate-bounce-in">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300 animate-pulse-slow">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Inventory Management</h3>
              <p className="text-gray-400">Real-time tracking and automated alerts for optimal stock levels</p>
            </div>

            <div className="shiny-card rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300 scroll-reveal animate-bounce-in" style={{animationDelay: '0.1s'}}>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300 animate-pulse-slow">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Logistics Coordination</h3>
              <p className="text-gray-400">Streamlined operations ensuring timely delivery and optimization</p>
            </div>

            <div className="shiny-card rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300 scroll-reveal animate-bounce-in" style={{animationDelay: '0.2s'}}>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300 animate-pulse-slow">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Analytics & Reporting</h3>
              <p className="text-gray-400">Advanced analytics for data-driven decision making</p>
            </div>

            <div className="shiny-card rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300 scroll-reveal animate-bounce-in" style={{animationDelay: '0.3s'}}>
              <div className="bg-gradient-to-br from-red-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300 animate-pulse-slow">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Compliance & Security</h3>
              <p className="text-gray-400">Regulatory compliance monitoring and secure operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <img src={aboutImg} alt="About" className="rounded-3xl shadow-2xl w-full h-auto object-cover" />
            </div>
            <div className="text-white scroll-reveal delay-1">
              <h2 className="text-5xl font-bold mb-6" style={{color: '#60a5fa', textShadow: '0 0 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.6), 0 0 60px rgba(96, 165, 250, 0.4)'}}>About This Project</h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                This project is developed at <span className="text-blue-400 font-semibold">Sri Eshwar College of Engineering</span> during the Full Stack Development course.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                AeroSynch represents a comprehensive airline supply chain management system designed to streamline aviation operations, enhance logistics coordination, and provide real-time insights for optimal decision-making.
              </p>
              <div className="flex items-center gap-3 text-gray-300">
                <GraduationCap className="h-6 w-6 text-blue-400" />
                <span className="text-lg">Full Stack Development Course Project</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-12 scroll-reveal">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Globe className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-4xl font-bold text-white mb-2">50+</h3>
                <p className="text-gray-400">Countries Served</p>
              </div>
              <div>
                <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-4xl font-bold text-white mb-2">2.5s</h3>
                <p className="text-gray-400">Avg Response Time</p>
              </div>
              <div>
                <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-4xl font-bold text-white mb-2">98%</h3>
                <p className="text-gray-400">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-5xl font-bold mb-4" style={{color: '#60a5fa', textShadow: '0 0 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.6), 0 0 60px rgba(96, 165, 250, 0.4)'}}>Contact Us</h2>
            <p className="text-xl text-gray-400">Get in touch with us</p>
          </div>
          <div className="shiny-card rounded-3xl p-12 scroll-reveal">
            <div className="space-y-6 text-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Department of Computer Science and Engineering</h3>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <MapPin className="h-6 w-6 text-blue-400" />
                <div className="text-left">
                  <p className="text-lg font-semibold text-white">Sri Eshwar College of Engineering</p>
                  <p className="text-gray-400">Kinathukadavu, Coimbatore</p>
                </div>
              </div>
              <div className="pt-6">
                <a 
                  href="https://sece.ac.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-lg transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                  Visit Website: sece.ac.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="shiny-card rounded-3xl p-12 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4" style={{color: '#60a5fa', textShadow: '0 0 20px rgba(96, 165, 250, 0.8), 0 0 40px rgba(96, 165, 250, 0.6), 0 0 60px rgba(96, 165, 250, 0.4)'}}>Ready to Optimize Your Supply Chain?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join leading airlines in transforming their operations
            </p>
            {!isAuthenticated && (
              <Link 
                to="/register" 
                className="btn-secondary inline-flex items-center gap-2"
              >
                Get Started Today
                <ArrowRight className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;