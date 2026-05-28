import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, UserCheck, MapPin, Shield, Star, Mail, Lock, ArrowRight, UserPlus, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const adminRequired = location.state?.adminRequired;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      if (result.user?.role === 'admin') navigate('/admin');
      else navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="left-content">
          <div className="badge trusted-badge">
            <Shield size={14} /> Trusted by 2,500+ Workers
          </div>
          <h1 className="login-title">
            Your Gateway to <span className="highlight">Local Services</span>
          </h1>
          <p className="login-subtitle">
            Join Pakistan's fastest-growing platform for connecting skilled workers with customers who need them most.
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon bg-gray"><UserCheck size={18} /></div>
              <span>Verified profiles with background checks</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon bg-teal"><MapPin size={18} /></div>
              <span>Location-based worker discovery</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon bg-blue"><Shield size={18} /></div>
              <span>Secure payments & booking system</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon bg-yellow"><Star size={18} /></div>
              <span>Ratings & reviews from real customers</span>
            </div>
          </div>

          <div className="stats-container">
            <div className="stat">
              <h3>2.5k+</h3>
              <p>Verified Workers</p>
            </div>
            <div className="stat">
              <h3>15k+</h3>
              <p>Jobs Done</p>
            </div>
            <div className="stat">
              <h3>4.8★</h3>
              <p>Avg Rating</p>
            </div>
          </div>
          
          <div className="floating-card just-joined glass">
            <CheckCircle2 size={20} className="star-icon" />
            <div>
              <h4>Just Joined!</h4>
              <p>Ali Raza • Electrician • Lahore</p>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <div className="auth-tabs">
            <Link to="/login" className="auth-tab active"><ArrowRight size={16}/> Login</Link>
            <Link to="/register" className="auth-tab"><UserPlus size={16}/> Register</Link>
          </div>

          <div className="form-header">
            <h2>Welcome Back 👋</h2>
            <p>Sign in to your SkillBridge account to continue.</p>
          </div>

          {adminRequired && (
            <div className="error-alert admin-hint">
              Admin access required. Sign in with an admin account.
            </div>
          )}

          {error && <div className="error-alert">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="zmrajpoot890@gmail.com" 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label>Password</label>
                <Link to="/contact" className="forgot-link">Forgot password?</Link>
              </div>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required 
                />
              </div>
            </div>

            <div className="form-group checkbox-group">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me for 30 days</label>
            </div>

            <button type="submit" className="btn-primary w-100 sign-in-btn" disabled={loading}>
               {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="divider-with-text">
            <span>or continue with</span>
          </div>

          <div className="social-login">
            <button type="button" className="social-btn" onClick={() => alert('Social login will be available in a future update. Please use email sign in.')}>
              <img src="https://www.google.com/favicon.ico" alt="Google" width="20" height="20" /> Google
            </button>
            <button type="button" className="social-btn" onClick={() => alert('Social login will be available in a future update. Please use email sign in.')}>
              <img src="https://www.facebook.com/favicon.ico" alt="Facebook" width="20" height="20" /> Facebook
            </button>
          </div>

          <p className="register-prompt">
            Don't have an account? <Link to="/register">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
