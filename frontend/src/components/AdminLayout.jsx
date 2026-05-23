import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Home, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <Shield size={22} className="admin-topbar-icon" />
          <div>
            <h1>SkillBridge Admin</h1>
            <p>Control panel</p>
          </div>
        </div>
        <div className="admin-topbar-right">
          <span className="admin-user-pill">
            {user?.firstName} {user?.lastName} · {user?.email}
          </span>
          <Link to="/" className="admin-topbar-btn">
            <Home size={16} /> View Site
          </Link>
          <button type="button" className="admin-topbar-btn admin-logout" onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>
      {children}
    </div>
  );
};

export default AdminLayout;
