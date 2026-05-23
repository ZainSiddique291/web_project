import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, MapPin, SlidersHorizontal, Star, Shield, LayoutGrid, Zap, Droplet,
  GraduationCap, Wrench, Paintbrush, Hammer, Eraser, List, User,
} from 'lucide-react';
import { workersApi, statsApi } from '../api/api';
import './Services.css';

const CATEGORIES = [
  { id: 'all', label: 'All Services', icon: LayoutGrid, className: '' },
  { id: 'electrical', label: 'Electrical', icon: Zap, className: 'text-yellow' },
  { id: 'plumbing', label: 'Plumbing', icon: Droplet, className: 'text-teal' },
  { id: 'tutoring', label: 'Tutoring', icon: GraduationCap, className: 'text-purple' },
  { id: 'technical', label: 'Technical', icon: Wrench, className: 'text-red' },
  { id: 'painting', label: 'Painting', icon: Paintbrush, className: 'text-green' },
  { id: 'carpentry', label: 'Carpentry', icon: Hammer, className: 'text-orange' },
  { id: 'cleaning', label: 'Cleaning', icon: Eraser, className: 'text-blue' },
];

const RATING_FILTERS = [
  { value: '', label: 'Any rating', stars: '' },
  { value: '5', label: '5.0', stars: '★★★★★' },
  { value: '4', label: '4.0+', stars: '★★★★☆' },
  { value: '3', label: '3.0+', stars: '★★★☆☆' },
];

const Services = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('all');
  const [minRating, setMinRating] = useState('');
  const [sort, setSort] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [workers, setWorkers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWorkers = useCallback(async () => {
    setLoading(true);
    try {
      const sortMap = { popular: undefined, rated: undefined, newest: 'newest', jobs: 'jobs' };
      const params = {
        search: search || undefined,
        location: location || undefined,
        category: category !== 'all' ? category : undefined,
        minRating: minRating || undefined,
        sort: sortMap[sort],
      };
      const { data } = await workersApi.list(params);
      let list = [...data];
      if (sort === 'rated') {
        list.sort((a, b) => (b.workerProfile?.rating || 0) - (a.workerProfile?.rating || 0));
      }
      setWorkers(list);
    } catch {
      setWorkers([]);
    } finally {
      setLoading(false);
    }
  }, [search, location, category, minRating, sort]);

  useEffect(() => {
    statsApi.getPlatform().then((res) => setStats(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchWorkers, 300);
    return () => clearTimeout(timer);
  }, [fetchWorkers]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWorkers();
  };

  const resetFilters = () => {
    setSearch('');
    setLocation('');
    setCategory('all');
    setMinRating('');
    setSort('popular');
  };

  const categoryEmoji = {
    electrical: '⚡',
    plumbing: '🔧',
    tutoring: '📚',
    technical: '🖥️',
    painting: '🎨',
    carpentry: '🪚',
    cleaning: '✨',
  };

  return (
    <div className="services-page">
      <div className="services-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link> / Services
          </div>
          <h1 className="page-title">
            Explore Our <span className="highlight">Services</span>
          </h1>
          <p className="page-subtitle">
            Browse verified local professionals across dozens of categories
            <br /> — from home repairs to tutoring.
          </p>

          <form onSubmit={handleSearch} className="search-box glass services-search">
            <div className="search-input-group">
              <Search size={20} className="input-icon" />
              <input
                type="text"
                placeholder="Search services, e.g. electrician"
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="divider" />
            <div className="search-input-group">
              <MapPin size={20} className="input-icon" />
              <input
                type="text"
                placeholder="City or area..."
                className="search-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary search-btn">Search</button>
          </form>

          <div className="service-stats">
            <span className="stat-badge"><Shield size={14} /> {stats?.verifiedWorkers || 0}+ Workers</span>
            <span className="stat-badge"><LayoutGrid size={14} /> {stats?.serviceCategories || 12} Categories</span>
            <span className="stat-badge"><Shield size={14} /> All Verified</span>
            <span className="stat-badge"><Star size={14} /> {stats?.averageRating || 4.8} Avg Rating</span>
          </div>
        </div>
      </div>

      <div className="categories-bar">
        <div className="container categories-container">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                className={`cat-btn ${category === cat.id ? 'active' : ''}`}
                onClick={() => setCategory(cat.id)}
              >
                <Icon size={16} className={cat.className} /> {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="container main-content-area">
        <div className="sidebar">
          <div className="filter-card">
            <div className="filter-header">
              <h3><SlidersHorizontal size={18} /> Filters</h3>
              <button type="button" className="reset-btn" onClick={resetFilters}>Reset All</button>
            </div>

            <div className="filter-section">
              <h4>MINIMUM RATING</h4>
              <div className="rating-options">
                {RATING_FILTERS.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    className={`rating-label ${minRating === r.value ? 'active' : ''}`}
                    onClick={() => setMinRating(r.value)}
                  >
                    {r.stars && <span className="stars">{r.stars}</span>} {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="results-area">
          <div className="promo-banner">
            <div className="promo-icon"><Star size={24} color="#f6a524" /></div>
            <div className="promo-text">
              <h3>Are you a skilled worker? Join SkillBridge today!</h3>
              <p>Get discovered by thousands of customers in your area and grow your income.</p>
            </div>
            <button type="button" className="btn-primary promo-btn" onClick={() => navigate('/register')}>
              Join Now
            </button>
          </div>

          <div className="results-header">
            <span>Showing <strong>{workers.length}</strong> services</span>
            <div className="sort-view">
              <select className="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="popular">Most Popular</option>
                <option value="rated">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="jobs">Most Jobs</option>
              </select>
              <div className="view-toggles">
                <button
                  type="button"
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  type="button"
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List view"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <p className="services-loading">Loading professionals...</p>
          ) : workers.length === 0 ? (
            <p className="services-empty">No workers found. Try adjusting your filters.</p>
          ) : (
            <div className={`workers-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
              {workers.map((worker) => (
                <Link
                  key={worker._id}
                  to={`/profile/${worker._id}`}
                  className="worker-card"
                >
                  <div className="worker-card-avatar">
                    {categoryEmoji[worker.workerProfile?.category] || <User size={24} />}
                  </div>
                  <div className="worker-card-body">
                    <h3>{worker.firstName} {worker.lastName}</h3>
                    <p className="worker-profession">{worker.workerProfile?.profession}</p>
                    <p className="worker-location"><MapPin size={12} /> {worker.location}</p>
                    <div className="worker-card-meta">
                      <span className="worker-rating"><Star size={14} fill="#fbbf24" color="#fbbf24" /> {worker.workerProfile?.rating?.toFixed(1)}</span>
                      <span>{worker.workerProfile?.jobsDone || 0} jobs</span>
                      {worker.isVerified && <span className="verified-tag"><Shield size={12} /> Verified</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
