import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut, ArrowLeft, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname === '/register' || location.pathname === '/login';
  const hideNavLinks = location.pathname.startsWith('/admin');

  if (isAuthPage) {
    return (
      <nav className="navbar">
        <div className="container nav-container">
          <Logo />
          <div className="nav-actions">
            <Link to="/" className="back-link-nav">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  const displayName = user ? (user.firstName || user.name?.split(' ')[0] || 'User') : '';

  const handleWelcomeClick = () => {
    if (user?.role === 'admin') navigate('/admin');
    else if (user?.role === 'worker') navigate('/worker-panel');
    else navigate('/my-orders');
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Logo />

        {!hideNavLinks && (
          <div className="nav-links">
            <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
            <Link to="/services" className={`nav-item ${location.pathname === '/services' ? 'active' : ''}`}>Services</Link>
            <Link to="/about" className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
            <Link to="/contact" className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
          </div>
        )}

        <div className="nav-actions">
          {user ? (
            <>
              <button type="button" className="user-welcome-btn" onClick={handleWelcomeClick}>
                <User size={16} className="user-icon" /> Welcome, {displayName}
              </button>
              <Link to="/settings" className="settings-nav-btn" title="Settings">
                <Settings size={18} />
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-item admin-nav-link">Admin</Link>
              )}
              {user.role === 'customer' && (
                <Link to="/my-orders" className="nav-item">My Orders</Link>
              )}
              {user.role === 'worker' && (
                <Link to="/worker-panel" className="nav-item">Worker Panel</Link>
              )}
              <button type="button" onClick={logout} className="logout-btn">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-link">Login</Link>
              <Link to="/register" className="btn-primary get-started">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
