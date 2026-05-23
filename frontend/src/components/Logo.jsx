import React from 'react';
import { Link } from 'react-router-dom';
import { Link2 } from 'lucide-react';
import './Logo.css';

const Logo = ({ className = '' }) => (
  <Link to="/" className={`logo-brand ${className}`}>
    <span className="logo-icon-wrap">
      <Link2 size={22} className="logo-icon" strokeWidth={2.5} />
    </span>
    <span className="logo-text">
      Skill<span className="logo-accent">Bridge</span>
    </span>
  </Link>
);

export default Logo;
