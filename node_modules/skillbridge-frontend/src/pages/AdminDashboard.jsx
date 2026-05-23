import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Briefcase, CreditCard, Settings,
  TrendingUp, Activity, Save, Mail, RefreshCw,
  UserCheck, MessageSquare, AlertCircle, ExternalLink,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { adminApi } from '../api/api';
import './AdminDashboard.css';

const COLORS = ['#f59e0b', '#14b8a6', '#8b5cf6', '#ef4444', '#22c55e'];

const defaultOverview = {
  stats: {
    totalWorkers: 0,
    totalCustomers: 0,
    jobsCompleted: 0,
    totalRevenue: 0,
    newMessages: 0,
    totalUsers: 0,
  },
  weeklyBookings: [
    { name: 'Mon', bookings: 0 },
    { name: 'Tue', bookings: 0 },
    { name: 'Wed', bookings: 0 },
    { name: 'Thu', bookings: 0 },
    { name: 'Fri', bookings: 0 },
    { name: 'Sat', bookings: 0 },
    { name: 'Sun', bookings: 0 },
  ],
  categoryData: [],
  recentBookings: [],
  recentContacts: [],
  recentWorkers: [],
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [overview, setOverview] = useState(defaultOverview);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [settingsForm, setSettingsForm] = useState({});
  const [saveMsg, setSaveMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const loadOverview = useCallback(async () => {
    setLoading(true);
    setApiError('');
    try {
      const { data } = await adminApi.overview();
      setOverview(data);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Could not load dashboard. Is the backend running on port 5000?');
      setOverview(defaultOverview);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  useEffect(() => {
    const loadTab = async () => {
      if (activeTab === 'overview') return;
      setTabLoading(true);
      setApiError('');
      try {
        if (activeTab === 'workers') {
          const { data } = await adminApi.users('worker');
          setUsers(data);
        } else if (activeTab === 'customers') {
          const { data } = await adminApi.users('customer');
          setUsers(data);
        } else if (activeTab === 'bookings') {
          const { data } = await adminApi.bookings();
          setBookings(data);
        } else if (activeTab === 'reports') {
          const { data } = await adminApi.contacts();
          setContacts(data);
        } else if (activeTab === 'settings') {
          const { data } = await adminApi.settings();
          setSettingsForm({
            supportEmail: data.supportEmail || '',
            supportPhone: data.supportPhone || '',
            address: data.address || '',
            supportHours: data.supportHours || '',
          });
        }
      } catch (err) {
        setApiError(err.response?.data?.message || 'Failed to load data. Check your login and backend.');
      } finally {
        setTabLoading(false);
      }
    };
    loadTab();
  }, [activeTab]);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await adminApi.updateSettings(settingsForm);
      setSaveMsg('Settings saved successfully');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch {
      setSaveMsg('Failed to save settings');
    }
  };

  const markContactRead = async (id) => {
    try {
      await adminApi.updateContactStatus(id, 'read');
      setContacts((prev) => prev.map((c) => (c._id === id ? { ...c, status: 'read' } : c)));
      loadOverview();
    } catch {
      setApiError('Could not update message status');
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'workers', label: 'Workers', icon: UserCheck },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: Briefcase },
    { id: 'reports', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = overview?.stats || defaultOverview.stats;
  const weeklyBookingsData = overview?.weeklyBookings?.length ? overview.weeklyBookings : defaultOverview.weeklyBookings;
  const categoryData = overview?.categoryData?.length ? overview.categoryData : [
    { name: 'Electrical', value: 12 },
    { name: 'Plumbing', value: 8 },
    { name: 'Tutoring', value: 6 },
  ];

  const formatRevenue = (n) => {
    if (n >= 1000000) return `Rs ${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `Rs ${(n / 1000).toFixed(0)}k`;
    return `Rs ${(n || 0).toLocaleString()}`;
  };

  const formatDate = (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <p className="admin-sidebar-title">MENU</p>
        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const badge = item.id === 'reports' && stats.newMessages > 0 ? stats.newMessages : null;
            return (
              <button
                key={item.id}
                type="button"
                className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {badge != null && <span className="menu-badge">{badge}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="admin-main">
        <div className="admin-page-header">
          <div>
            <h2>{menuItems.find((m) => m.id === activeTab)?.label || 'Dashboard'}</h2>
            <p>Manage workers, customers, bookings, and site settings</p>
          </div>
          <button type="button" className="admin-refresh-btn" onClick={loadOverview} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'spin' : ''} /> Refresh
          </button>
        </div>

        {apiError && (
          <div className="admin-error-banner">
            <AlertCircle size={18} />
            <span>{apiError}</span>
          </div>
        )}

        {loading && activeTab === 'overview' ? (
          <div className="admin-loading-box">Loading dashboard data...</div>
        ) : activeTab === 'overview' ? (
          <>
            <div className="stats-grid">
              <div className="admin-stat-card">
                <div className="stat-icon bg-blue-light"><Users size={24} color="#3b82f6" /></div>
                <div className="stat-content">
                  <h3>{stats.totalWorkers}</h3>
                  <p>Total Workers</p>
                </div>
              </div>
              <div className="admin-stat-card">
                <div className="stat-icon bg-purple-light"><Users size={24} color="#8b5cf6" /></div>
                <div className="stat-content">
                  <h3>{stats.totalCustomers}</h3>
                  <p>Total Customers</p>
                </div>
              </div>
              <div className="admin-stat-card">
                <div className="stat-icon bg-teal-light"><Briefcase size={24} color="#14b8a6" /></div>
                <div className="stat-content">
                  <h3>{stats.jobsCompleted}</h3>
                  <p>Jobs Completed</p>
                </div>
              </div>
              <div className="admin-stat-card">
                <div className="stat-icon bg-green-light"><CreditCard size={24} color="#22c55e" /></div>
                <div className="stat-content">
                  <h3>{formatRevenue(stats.totalRevenue)}</h3>
                  <p>Total Revenue</p>
                </div>
              </div>
              <div className="admin-stat-card">
                <div className="stat-icon bg-orange-light"><Mail size={24} color="#f59e0b" /></div>
                <div className="stat-content">
                  <h3>{stats.newMessages}</h3>
                  <p>New Messages</p>
                </div>
              </div>
              <div className="admin-stat-card">
                <div className="stat-icon bg-blue-light"><TrendingUp size={24} color="#3b82f6" /></div>
                <div className="stat-content">
                  <h3>{stats.totalUsers}</h3>
                  <p>All Users</p>
                </div>
              </div>
            </div>

            <div className="charts-grid">
              <div className="chart-card">
                <h3 className="chart-title">Weekly Bookings</h3>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={weeklyBookingsData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                      <RechartsTooltip />
                      <Bar dataKey="bookings" fill="#fb923c" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="chart-card">
                <h3 className="chart-title">Service Categories</h3>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {categoryData.map((entry, index) => (
                          <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="admin-tables-row">
              <div className="admin-panel">
                <div className="panel-head">
                  <h3>Recent Bookings</h3>
                  <button type="button" className="link-btn" onClick={() => setActiveTab('bookings')}>View all</button>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Worker</th>
                      <th>Service</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(overview.recentBookings || []).map((b) => (
                      <tr key={b._id}>
                        <td>{b.customer?.firstName} {b.customer?.lastName}</td>
                        <td>{b.worker?.firstName} {b.worker?.lastName}</td>
                        <td>{b.serviceCategory}</td>
                        <td>Rs {b.amount?.toLocaleString()}</td>
                        <td>{formatDate(b.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {(!overview.recentBookings || overview.recentBookings.length === 0) && (
                  <p className="admin-empty">No bookings yet. They appear when jobs are completed.</p>
                )}
              </div>

              <div className="admin-panel">
                <div className="panel-head">
                  <h3>Recent Workers</h3>
                  <button type="button" className="link-btn" onClick={() => setActiveTab('workers')}>View all</button>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Profession</th>
                      <th>Rating</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(overview.recentWorkers || []).map((w) => (
                      <tr key={w._id}>
                        <td>{w.firstName} {w.lastName}</td>
                        <td>{w.workerProfile?.profession}</td>
                        <td>{w.workerProfile?.rating?.toFixed(1) || '—'}</td>
                        <td>
                          <Link to={`/profile/${w._id}`} className="table-link" target="_blank" rel="noreferrer">
                            <ExternalLink size={14} /> Profile
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="admin-panel">
              <div className="panel-head">
                <h3>Recent Contact Messages</h3>
                <button type="button" className="link-btn" onClick={() => setActiveTab('reports')}>View all</button>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(overview.recentContacts || []).map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.subject}</td>
                      <td><span className={`status-pill ${c.status}`}>{c.status}</span></td>
                      <td>{formatDate(c.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(!overview.recentContacts || overview.recentContacts.length === 0) && (
                <p className="admin-empty">No contact messages yet. Submit the form on the Contact page to test.</p>
              )}
            </div>
          </>
        ) : tabLoading ? (
          <div className="admin-loading-box">Loading {activeTab}...</div>
        ) : activeTab === 'settings' ? (
          <div className="admin-panel">
            <h3>Site Settings</h3>
            <p className="panel-desc">These details appear on the Contact page and footer.</p>
            {saveMsg && <p className="admin-save-msg">{saveMsg}</p>}
            <form onSubmit={handleSaveSettings} className="admin-settings-form">
              <label>Support Email</label>
              <input value={settingsForm.supportEmail || ''} onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })} />
              <label>Support Phone</label>
              <input value={settingsForm.supportPhone || ''} onChange={(e) => setSettingsForm({ ...settingsForm, supportPhone: e.target.value })} />
              <label>Office Address</label>
              <textarea value={settingsForm.address || ''} onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })} rows={3} />
              <label>Support Hours</label>
              <input value={settingsForm.supportHours || ''} onChange={(e) => setSettingsForm({ ...settingsForm, supportHours: e.target.value })} />
              <button type="submit" className="btn-primary admin-save-btn"><Save size={16} /> Save Settings</button>
            </form>
          </div>
        ) : activeTab === 'reports' ? (
          <div className="admin-panel">
            <h3>All Contact Messages ({contacts.length})</h3>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td><a href={`mailto:${c.email}`} className="table-link">{c.email}</a></td>
                      <td>{c.subject}</td>
                      <td className="msg-cell">{c.message?.slice(0, 60)}{c.message?.length > 60 ? '…' : ''}</td>
                      <td><span className={`status-pill ${c.status}`}>{c.status}</span></td>
                      <td>
                        {c.status === 'new' && (
                          <button type="button" className="admin-action-btn" onClick={() => markContactRead(c._id)}>Mark Read</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {contacts.length === 0 && <p className="admin-empty">No messages yet.</p>}
            </div>
          </div>
        ) : activeTab === 'bookings' ? (
          <div className="admin-panel">
            <h3>All Bookings ({bookings.length})</h3>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Worker</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b._id}>
                      <td>{b.customer?.firstName} {b.customer?.lastName}</td>
                      <td>{b.worker?.firstName} {b.worker?.lastName}</td>
                      <td>{b.serviceCategory}</td>
                      <td>Rs {b.amount?.toLocaleString()}</td>
                      <td><span className={`status-pill ${b.status}`}>{b.status}</span></td>
                      <td>{formatDate(b.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bookings.length === 0 && <p className="admin-empty">No bookings in database.</p>}
            </div>
          </div>
        ) : (
          <div className="admin-panel">
            <h3>{activeTab === 'workers' ? `Workers (${users.length})` : `Customers (${users.length})`}</h3>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Location</th>
                    {activeTab === 'workers' && <th>Profession</th>}
                    {activeTab === 'workers' && <th>Rating</th>}
                    {activeTab === 'workers' && <th></th>}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td><strong>{u.firstName} {u.lastName}</strong></td>
                      <td>{u.email}</td>
                      <td>{u.phoneNumber || '—'}</td>
                      <td>{u.location || '—'}</td>
                      {activeTab === 'workers' && <td>{u.workerProfile?.profession || '—'}</td>}
                      {activeTab === 'workers' && <td>{u.workerProfile?.rating?.toFixed(1) || '—'}</td>}
                      {activeTab === 'workers' && (
                        <td>
                          <Link to={`/profile/${u._id}`} className="table-link" target="_blank" rel="noreferrer">View</Link>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length === 0 && <p className="admin-empty">No {activeTab} found.</p>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
