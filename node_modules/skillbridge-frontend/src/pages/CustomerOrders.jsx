import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag, RefreshCw, Mail, User, MessageSquare, DollarSign,
  Briefcase, ExternalLink,
} from 'lucide-react';
import { bookingsApi } from '../api/api';
import './WorkerPanel.css';
import './CustomerOrders.css';

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const loadOrders = async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError('');
    try {
      const { data } = await bookingsApi.myOrders();
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load your order history');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filtered = orders.filter((o) => filter === 'all' || o.status === filter);

  const formatStatus = (s) => s?.charAt(0).toUpperCase() + (s?.slice(1) || '');

  if (loading) {
    return (
      <div className="panel-page orders-page-wrap">
        <div className="panel-loading">
          <RefreshCw size={28} className="spin" />
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="panel-page orders-page-wrap">
      <div className="container panel-container">
        <header className="panel-header">
          <div>
            <span className="panel-eyebrow"><ShoppingBag size={14} /> Order History</span>
            <h1>My Orders</h1>
            <p>Track all your booking requests and worker responses.</p>
          </div>
          <button
            type="button"
            className="panel-refresh-btn"
            onClick={() => loadOrders(true)}
            disabled={refreshing}
          >
            <RefreshCw size={16} className={refreshing ? 'spin' : ''} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </header>

        {error && <div className="panel-alert panel-alert-error">{error}</div>}

        <div className="orders-summary">
          <div className="orders-summary-card">
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>
          <div className="orders-summary-card">
            <h3>{orders.filter((o) => o.status === 'pending').length}</h3>
            <p>Pending</p>
          </div>
          <div className="orders-summary-card">
            <h3>{orders.filter((o) => ['accepted', 'completed'].includes(o.status)).length}</h3>
            <p>Confirmed</p>
          </div>
        </div>

        <div className="panel-toolbar">
          <div className="panel-filters">
            {['all', 'pending', 'accepted', 'countered', 'denied', 'completed'].map((f) => (
              <button
                key={f}
                type="button"
                className={`panel-filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'All' : formatStatus(f)}
              </button>
            ))}
          </div>
          <Link to="/services" className="panel-link-btn">
            <Briefcase size={14} /> Find Workers
          </Link>
        </div>

        {filtered.length === 0 ? (
          <div className="panel-empty">
            <ShoppingBag size={40} />
            <h3>No orders {filter !== 'all' ? `with status "${filter}"` : 'yet'}</h3>
            <p>Browse services and hire a worker to see your orders here.</p>
            <Link to="/services" className="btn-primary orders-cta-btn">
              Explore Services
            </Link>
          </div>
        ) : (
          <div className="orders-cards-list">
            {filtered.map((o) => (
              <article key={o._id} className="orders-card">
                <div className="orders-card-header">
                  <div className="orders-worker-info">
                    <div className="panel-avatar"><User size={18} /></div>
                    <div>
                      <h4>{o.worker?.firstName} {o.worker?.lastName}</h4>
                      <span className="orders-profession">{o.worker?.workerProfile?.profession || o.serviceCategory}</span>
                    </div>
                  </div>
                  <span className={`panel-status-pill status-${o.status}`}>
                    {formatStatus(o.status)}
                  </span>
                </div>

                <div className="orders-card-body">
                  <div className="panel-detail-row">
                    <MessageSquare size={15} />
                    <div>
                      <span className="panel-label">Your Need</span>
                      <p>{o.needDescription || '—'}</p>
                    </div>
                  </div>
                  <div className="panel-detail-row">
                    <DollarSign size={15} />
                    <div>
                      <span className="panel-label">Fair Amount</span>
                      <p className="panel-fair">
                        Rs {(o.amount || o.customerFair || 0).toLocaleString()}
                        {o.workerFair != null && o.status === 'countered' && (
                          <span className="orders-counter-note"> (worker counter: Rs {o.workerFair.toLocaleString()})</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="panel-detail-row">
                    <Briefcase size={15} />
                    <div>
                      <span className="panel-label">Service</span>
                      <p className="orders-service-tag">{o.serviceCategory}</p>
                    </div>
                  </div>
                </div>

                <div className="orders-card-footer">
                  {o.worker?.email && (
                    <a href={`mailto:${o.worker.email}`} className="orders-contact-btn">
                      <Mail size={16} /> Contact Worker
                    </a>
                  )}
                  {o.worker?._id && (
                    <Link to={`/profile/${o.worker._id}`} className="orders-profile-link">
                      <ExternalLink size={14} /> View Profile
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;
