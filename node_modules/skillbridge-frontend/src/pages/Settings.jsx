import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Phone, MapPin, Save, Shield, Briefcase, Wrench } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../api/api';
import { parseSkillsFromText, skillsToText } from '../utils/skills';
import './Settings.css';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    location: '',
    profession: '',
    about: '',
    skillsText: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const wp = user.workerProfile || {};
    setForm({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phoneNumber: user.phoneNumber || '',
      location: user.location || '',
      profession: wp.profession || '',
      about: wp.about || '',
      skillsText: skillsToText(wp.skills),
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
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        phoneNumber: form.phoneNumber,
        location: form.location,
      };

      if (user.role === 'worker') {
        const skills = parseSkillsFromText(form.skillsText);
        payload.workerProfile = {
          profession: form.profession,
          about: form.about,
          skills: skills.length ? skills : parseSkillsFromText(form.about),
        };
      }

      const { data } = await authApi.updateProfile(payload);
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
            <Link to="/worker-panel" className="btn-outline settings-profile-link">
              <Briefcase size={16} /> Open Worker Panel
            </Link>
          )}

          {user.role === 'customer' && (
            <Link to="/my-orders" className="btn-outline settings-profile-link">
              <Briefcase size={16} /> Open My Orders
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

            {user.role === 'worker' && (
              <div className="settings-worker-block">
                <h3><Wrench size={16} /> Worker Profile</h3>
                <div className="form-group">
                  <label>Profession</label>
                  <input name="profession" value={form.profession} onChange={handleChange} placeholder="e.g. Electrician" />
                </div>
                <div className="form-group">
                  <label>About / Description</label>
                  <textarea
                    name="about"
                    value={form.about}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell customers about your experience and services"
                    className="settings-textarea"
                  />
                </div>
                <div className="form-group">
                  <label>Skills & Expertise</label>
                  <input
                    name="skillsText"
                    value={form.skillsText}
                    onChange={handleChange}
                    placeholder="Wiring, Panel repair, Lighting (comma-separated)"
                  />
                  <p className="settings-field-hint">Shown as tags on your public profile. Separate each skill with a comma.</p>
                </div>
              </div>
            )}

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
