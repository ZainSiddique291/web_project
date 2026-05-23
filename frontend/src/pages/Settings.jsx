import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Phone, MapPin, Save, Shield, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/api';
import './Settings.css';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    location: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setForm({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phoneNumber: user.phoneNumber || '',
      location: user.location || '',
    });
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const { data } = await authApi.updateProfile(form);
      updateUser(data);
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="settings-page">
      <div className="container settings-container">
        <h1>Account Settings</h1>
        <p className="settings-sub">Manage your SkillBridge profile and preferences.</p>

        <div className="settings-card glass">
          <div className="settings-user-header">
            <div className="settings-avatar">
              <User size={28} />
            </div>
            <div>
              <h2>{user.firstName} {user.lastName}</h2>
              <p>{user.email}</p>
              <span className="role-badge">{user.role}</span>
            </div>
          </div>

          {user.role === 'admin' && (
            <Link to="/admin" className="btn-primary settings-admin-link">
              <Shield size={16} /> Open Admin Dashboard
            </Link>
          )}

          {user.role === 'worker' && (
            <Link to={`/profile/${user._id}`} className="btn-outline settings-profile-link">
              <Briefcase size={16} /> View Public Profile
            </Link>
          )}

          {message && <div className="success-alert">{message}</div>}
          {error && <div className="error-alert">{error}</div>}

          <form onSubmit={handleSubmit} className="settings-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label><Phone size={14} /> Phone</label>
              <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label><MapPin size={14} /> Location</label>
              <input name="location" value={form.location} onChange={handleChange} />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              <Save size={16} /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
