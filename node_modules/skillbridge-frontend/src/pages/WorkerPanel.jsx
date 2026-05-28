import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase, Clock, DollarSign, Mail, RefreshCw, CheckCircle, XCircle,
  MessageSquare, User, Inbox,
} from 'lucide-react';
import { bookingsApi } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './WorkerPanel.css';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'accepted', label: 'Accepted' },
  { id: 'countered', label: 'Countered' },
  { id: 'denied', label: 'Denied' },
];

const WorkerPanel = () => {
  const { user } = useAuth();
  const [data, setData] = useState({ bookings: [], stats: {} });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [filter, setFilter] = useState('all');
  const [counterModal, setCounterModal] = useState(null);
  const [counterFair, setCounterFair] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  const loadPanel = async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError('');
    try {
      const res = await bookingsApi.workerPanel();
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load worker panel');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPanel();
  }, []);

  const filteredBookings = data.bookings.filter((b) => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  const onDecision = async (bookingId, action, fairValue) => {
    const payload = { action };
    if (action === 'counter') {
      if (!fairValue || Number(fairValue) <= 0) {
        setError('Please enter a valid counter fair amount');
        return;
      }
      payload.workerFair = Number(fairValue);
    }

    setActionLoading(bookingId + action);
    setError('');
    try {
      await bookingsApi.workerDecision(bookingId, payload);
      setNote(`Request ${action === 'deny' ? 'denied' : action === 'accept' ? 'accepted' : 'updated'} successfully`);
      setTimeout(() => setNote(''), 2500);
      setCounterModal(null);
      setCounterFair('');
      loadPanel(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update booking');
    } finally {
      setActionLoading(null);
    }
  };

  const openCounter = (booking) => {
    setCounterModal(booking);
    setCounterFair(String(booking.customerFair || ''));
    setError('');
  };

  const formatStatus = (s) => s?.charAt(0).toUpperCase() + (s?.slice(1) || '');

  if (loading) {
    return (
      <div className="panel-page">
        <div className="panel-loading">
          <RefreshCw size={28} className="spin" />
          <p>Loading your worker panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="panel-page worker-panel-page">
      <div className="container panel-container">
        <header className="panel-header">
          <div>
            <span className="panel-eyebrow"><Briefcase size={14} /> Worker Dashboard</span>
            <h1>Worker Panel</h1>
            <p>Manage booking requests, track earnings, and contact customers.</p>
          </div>
          <button
            type="button"
            className="panel-refresh-btn"
            onClick={() => loadPanel(true)}
            disabled={refreshing}
          >
            <RefreshCw size={16} className={refreshing ? 'spin' : ''} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </header>

        {error && <div className="panel-alert panel-alert-error">{error}</div>}
        {note && <div className="panel-alert panel-alert-success">{note}</div>}

        <div className="panel-stats-grid">
          <div className="panel-stat-card stat-total">
            <div className="panel-stat-icon"><Inbox size={22} /></div>
            <div>
              <h3>{data.stats.totalBookings || 0}</h3>
              <p>Total Bookings</p>
            </div>
          </div>
          <div className="panel-stat-card stat-pending">
            <div className="panel-stat-icon"><Clock size={22} /></div>
            <div>
              <h3>{data.stats.pendingBookings || 0}</h3>
              <p>Pending Requests</p>
            </div>
          </div>
          <div className="panel-stat-card stat-earnings">
            <div className="panel-stat-icon"><DollarSign size={22} /></div>
            <div>
              <h3>Rs {(data.stats.totalEarnings || 0).toLocaleString()}</h3>
              <p>Total Earnings</p>
            </div>
          </div>
        </div>

        <div className="panel-toolbar">
          <div className="panel-filters">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`panel-filter-btn ${filter === f.id ? 'active' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
                {f.id !== 'all' && (
                  <span className="filter-count">
                    {data.bookings.filter((b) => b.status === f.id).length}
                  </span>
                )}
              </button>
            ))}
          </div>
          {user?._id && (
            <Link to={`/profile/${user._id}`} className="panel-link-btn">
              View Public Profile
            </Link>
          )}
        </div>

        {filteredBookings.length === 0 ? (
          <div className="panel-empty">
            <MessageSquare size={40} />
            <h3>No bookings {filter !== 'all' ? `with status "${filter}"` : 'yet'}</h3>
            <p>When customers hire you, their requests will appear here.</p>
          </div>
        ) : (
          <div className="panel-cards-list">
            {filteredBookings.map((b) => (
              <article key={b._id} className="panel-booking-card">
                <div className="panel-card-top">
                  <div className="panel-customer">
                    <div className="panel-avatar"><User size={18} /></div>
                    <div>
                      <h4>{b.customer?.firstName} {b.customer?.lastName}</h4>
                      <span className="panel-service">{b.serviceCategory}</span>
                    </div>
                  </div>
                  <span className={`panel-status-pill status-${b.status}`}>
                    {formatStatus(b.status)}
                  </span>
                </div>

                <div className="panel-card-body">
                  <div className="panel-detail-row">
                    <MessageSquare size={15} />
                    <div>
                      <span className="panel-label">Customer Need</span>
                      <p>{b.needDescription || 'No description provided'}</p>
                    </div>
                  </div>
                  <div className="panel-detail-row">
                    <DollarSign size={15} />
                    <div>
                      <span className="panel-label">Offered Fair</span>
                      <p className="panel-fair">Rs {(b.customerFair || 0).toLocaleString()}</p>
                      {b.workerFair != null && b.status === 'countered' && (
                        <p className="panel-counter-fair">Your counter: Rs {b.workerFair.toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                  {b.customer?.email && (
                    <div className="panel-detail-row">
                      <Mail size={15} />
                      <div>
                        <span className="panel-label">Contact</span>
                        <a href={`mailto:${b.customer.email}`} className="panel-email-link">
                          {b.customer.email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {['pending', 'countered'].includes(b.status) ? (
                  <div className="panel-card-actions">
                    <button
                      type="button"
                      className="panel-btn panel-btn-accept"
                      disabled={!!actionLoading}
                      onClick={() => onDecision(b._id, 'accept')}
                    >
                      <CheckCircle size={16} />
                      {actionLoading === b._id + 'accept' ? '...' : 'Accept Fair'}
                    </button>
                    <button
                      type="button"
                      className="panel-btn panel-btn-counter"
                      disabled={!!actionLoading}
                      onClick={() => openCounter(b)}
                    >
                      <DollarSign size={16} /> Offer Fair
                    </button>
                    <button
                      type="button"
                      className="panel-btn panel-btn-deny"
                      disabled={!!actionLoading}
                      onClick={() => onDecision(b._id, 'deny')}
                    >
                      <XCircle size={16} />
                      {actionLoading === b._id + 'deny' ? '...' : 'Deny'}
                    </button>
                  </div>
                ) : (
                  <div className="panel-card-finalized">
                    {b.workerResponse || 'This request has been finalized.'}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>

      {counterModal && (
        <div className="panel-modal-overlay" onClick={() => setCounterModal(null)} role="presentation">
          <div className="panel-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <h3>Offer Your Fair</h3>
            <p>
              Customer offered Rs {(counterModal.customerFair || 0).toLocaleString()}.
              Enter your counter amount (PKR):
            </p>
            <input
              type="number"
              min="1"
              value={counterFair}
              onChange={(e) => setCounterFair(e.target.value)}
              placeholder="e.g. 5000"
              className="panel-modal-input"
              autoFocus
            />
            <div className="panel-modal-actions">
              <button type="button" className="panel-btn panel-btn-deny" onClick={() => setCounterModal(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="panel-btn panel-btn-accept"
                disabled={!!actionLoading}
                onClick={() => onDecision(counterModal._id, 'counter', counterFair)}
              >
                Submit Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerPanel;
