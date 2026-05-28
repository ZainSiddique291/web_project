import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Shield, MapPin, Clock, Edit, CheckCircle, Phone, Mail, Star, Wrench, X, ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { workersApi, bookingsApi } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './WorkerProfile.css';

const WorkerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [needDescription, setNeedDescription] = useState('');
  const [customerFair, setCustomerFair] = useState('');
  const [hireMessage, setHireMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await workersApi.getById(id);
        setWorker(data);
      } catch {
        setError('Worker profile not found');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const categoryEmoji = {
    electrical: '⚡',
    plumbing: '🔧',
    tutoring: '📚',
    technical: '🖥️',
    painting: '🎨',
    carpentry: '🪚',
    cleaning: '✨',
  };

  const isOwnProfile = user?._id === worker?._id;
  const canHire = user?.role === 'customer' && !isOwnProfile;

  const handleHireRequest = async (e) => {
    e.preventDefault();
    setHireMessage('');
    try {
      await bookingsApi.createRequest({
        workerId: worker._id,
        serviceCategory: wp.category || wp.profession || 'General',
        needDescription,
        customerFair: Number(customerFair),
      });
      setNeedDescription('');
      setCustomerFair('');
      setHireMessage('Booking request sent to worker successfully.');
    } catch (err) {
      setHireMessage(err.response?.data?.message || 'Could not send booking request');
    }
  };

  if (loading) return <div className="page-loading">Loading profile...</div>;
  if (error || !worker) {
    return (
      <div className="profile-error container">
        <p>{error || 'Profile not found'}</p>
        <Link to="/services" className="btn-primary"><ArrowLeft size={16} /> Back to Services</Link>
      </div>
    );
  }

  const wp = worker.workerProfile || {};
  const earningsData = wp.earningsHistory?.length
    ? wp.earningsHistory
    : [{ name: 'N/A', earnings: 0 }];
  const memberSince = new Date(worker.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="container">
          <button type="button" className="profile-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} /> Back
          </button>
          <div className="profile-header">
            <div className="profile-info-section">
              <div className="avatar-lg bg-yellow">
                <span className="avatar-icon">{categoryEmoji[wp.category] || '👤'}</span>
              </div>
              <div className="profile-details">
                <h1 className="profile-name">{worker.firstName} {worker.lastName}</h1>
                <div className="profile-badges">
                  <span className="badge-item text-yellow"><Shield size={14} /> {wp.profession}</span>
                  <span className="badge-item text-yellow"><Star size={14} fill="currentColor" /> Top Rated</span>
                  {worker.isVerified && (
                    <span className="badge-item text-yellow"><CheckCircle size={14} /> Verified</span>
                  )}
                </div>
                <div className="profile-meta">
                  <span><MapPin size={16} /> {worker.location}</span>
                  <span><Clock size={16} /> Member since {memberSince}</span>
                </div>
              </div>
            </div>

            <div className="profile-stats-cards">
              <div className="stat-card glass">
                <h3>{wp.rating?.toFixed(1) || '—'}</h3>
                <p>Rating</p>
              </div>
              <div className="stat-card glass">
                <h3>{wp.jobsDone || 0}</h3>
                <p>Jobs Done</p>
              </div>
              <div className="stat-card glass">
                <h3>{wp.completionRate || 98}%</h3>
                <p>Completion</p>
              </div>
              <div className="stat-card glass">
                <h3>Rs {(wp.monthlyEarnings || 0).toLocaleString()}</h3>
                <p>This Month</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container profile-content">
        <div className="profile-sidebar">
          <div className="content-card">
            <div className="card-header">
              <h3>About Me</h3>
              {isOwnProfile && (
                <Link to="/settings" className="btn-edit"><Edit size={16} /> Edit</Link>
              )}
            </div>
            <p className="about-text">{wp.about || 'No description provided.'}</p>

            <div className="section-divider" />

            <h4 className="section-title"><Wrench size={16} /> Skills & Expertise</h4>
            <div className="skills-tags">
              {(wp.skills || []).map((skill) => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>

            <div className="section-divider" />

            <h4 className="section-title"><Clock size={16} /> Availability</h4>
            <ul className="availability-list">
              <li><CheckCircle size={14} className="text-green" /> {wp.availability || 'Contact for availability'}</li>
              <li><X size={14} className="text-red" /> Sunday: Closed</li>
            </ul>

            <div className="section-divider" />

            <h4 className="section-title"><Phone size={16} /> Contact</h4>
            <div className="contact-info">
              <p><Mail size={14} /> {worker.email}</p>
              <p><Phone size={14} /> {worker.phoneNumber}</p>
            </div>

            <a href={`mailto:${worker.email}`} className="btn-primary profile-contact-btn">
              <Mail size={16} /> Contact via Email
            </a>

            {canHire && (
              <form className="hire-request-form" onSubmit={handleHireRequest}>
                <h4 className="section-title">Hire Request</h4>
                <textarea
                  placeholder="Tell your need..."
                  value={needDescription}
                  onChange={(e) => setNeedDescription(e.target.value)}
                  required
                  rows={3}
                />
                <input
                  type="number"
                  placeholder="Your fair (PKR)"
                  value={customerFair}
                  onChange={(e) => setCustomerFair(e.target.value)}
                  required
                  min="1"
                />
                <button type="submit" className="btn-primary profile-contact-btn">Send Request</button>
                {hireMessage && <p className="hire-note">{hireMessage}</p>}
              </form>
            )}
          </div>
        </div>

        <div className="profile-main">
          <div className="content-card">
            <h3 className="chart-title">Earnings Overview (Last 6 Months)</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(val) => `Rs ${val.toLocaleString()}`} />
                  <Tooltip
                    contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                    formatter={(value) => [`Rs ${value.toLocaleString()}`, 'Earnings']}
                  />
                  <Line type="monotone" dataKey="earnings" stroke="#f6a524" strokeWidth={3} dot={{ r: 4, fill: '#f6a524', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
