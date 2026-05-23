import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import { statsApi } from '../api/api';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  const [settings, setSettings] = useState(null);

  if (location.pathname.startsWith('/admin')) return null;

  useEffect(() => {
    statsApi.getSettings().then((res) => setSettings(res.data)).catch(() => {});
  }, []);

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>Connecting skilled local professionals with customers across Pakistan.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/settings">Settings</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <p><Phone size={14} /> {settings?.supportPhone || '+92 300 1234567'}</p>
          <p><Mail size={14} /> {settings?.supportEmail || 'support@skillbridge.pk'}</p>
          <p><MapPin size={14} /> {settings?.address?.slice(0, 40) || 'Lahore, Pakistan'}...</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SkillBridge. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
