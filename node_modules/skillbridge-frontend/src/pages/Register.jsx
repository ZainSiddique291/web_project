import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, Phone, MapPin, Eye, EyeOff, UserPlus, Briefcase, Wrench } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Register.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    location: '',
    password: '',
    role: 'customer',
    profession: '',
    skillsDescription: '',
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }

    if (formData.role === 'worker' && !formData.skillsDescription.trim()) {
      setError('Please describe your skills and expertise');
      return;
    }

    setLoading(true);
    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      location: formData.location,
      password: formData.password,
      role: formData.role,
      ...(formData.role === 'worker' && {
        profession: formData.profession,
        skillsDescription: formData.skillsDescription.trim(),
      }),
    });

    setLoading(false);

    if (result.success) {
      if (result.user?.role === 'admin') navigate('/admin');
      else if (result.user?.role === 'worker') navigate('/worker-panel');
      else navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="register-page">
      {/* Left side - Banner / Marketing info */}
      <div className="register-left">
        <div className="left-content">
          <div className="badge trusted-badge">
            <Shield size={14} /> Trusted by 2,500+ Workers
          </div>
          <h1 className="register-title">
            Your Gateway to <span className="highlight">Local Services</span>
          </h1>
          <p className="register-subtitle">
            Join Pakistan's fastest-growing platform for connecting skilled workers with customers who need them most.
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon bg-gray-icon">
                <User size={18} />
              </div>
              <span>Verified profiles with background checks</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon bg-teal-icon">
                <MapPin size={18} />
              </div>
              <span>Location-based worker discovery</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon bg-blue-icon">
                <Shield size={18} />
              </div>
              <span>Secure payments & booking system</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon bg-yellow-icon">
                <StarIcon />
              </div>
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
            <div className="checkmark-circle">
              <CheckIcon />
            </div>
            <div>
              <h4>Just Joined!</h4>
              <p>Ali Raza • Electrician • Lahore</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="register-right">
        <div className="register-form-container">
          <div className="form-header">
            <h2>Create Account ✨</h2>
            <p>Join SkillBridge to connect with top local talent.</p>
          </div>

          {error && <div className="error-alert">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Ahmad" 
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Raza" 
                    required 
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com" 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-with-icon">
                <Phone size={18} className="input-icon" />
                <input 
                  type="text" 
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+92 300 1234567" 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>City / Location</label>
              <div className="input-with-icon">
                <MapPin size={18} className="input-icon" />
                <input 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Lahore, Karachi, Islamabad..." 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password" 
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="password-hint">Enter a password</p>
            </div>

            <div className="form-group">
              <label>Register As</label>
              <select name="role" value={formData.role} onChange={handleChange} required className="register-select">
                <option value="customer">Customer</option>
                <option value="worker">Worker</option>
              </select>
            </div>

            {formData.role === 'worker' && (
              <div className="worker-register-fields">
                <div className="form-group">
                  <label><Briefcase size={14} /> Profession / Job Title</label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    placeholder="e.g. Electrician, Plumber, Tutor"
                  />
                </div>
                <div className="form-group">
                  <label><Wrench size={14} /> Skills & Description</label>
                  <textarea
                    name="skillsDescription"
                    value={formData.skillsDescription}
                    onChange={handleChange}
                    placeholder="Describe your experience and list skills (comma-separated), e.g. Wiring, Panel repair, Emergency fixes"
                    rows={4}
                    required
                    className="register-textarea"
                  />
                  <p className="field-hint">This appears in your profile &quot;About&quot; and as skill tags. Separate skills with commas.</p>
                </div>
              </div>
            )}

            <div className="form-group checkbox-group">
              <input 
                type="checkbox" 
                id="agreeToTerms" 
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agreeToTerms">
                I agree to the <Link to="/about" className="link-inline">Terms of Service</Link> and <Link to="/contact" className="link-inline">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" className="btn-primary w-100 register-submit-btn" disabled={loading}>
              {loading ? 'Creating Account...' : (
                <>
                  <UserPlus size={18} /> Create My Account
                </>
              )}
            </button>
          </form>

          <div className="divider-with-text">
            <span>or sign up with</span>
          </div>

          <div className="social-login">
            <button type="button" className="social-btn" onClick={() => alert('Social sign-up will be available in a future update. Please use the form above.')}>
              <img src="https://www.google.com/favicon.ico" alt="Google" width="18" height="18" /> Google
            </button>
            <button type="button" className="social-btn" onClick={() => alert('Social sign-up will be available in a future update. Please use the form above.')}>
              <img src="https://www.facebook.com/favicon.ico" alt="Facebook" width="18" height="18" /> Facebook
            </button>
          </div>

          <p className="login-prompt">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Help icons inline
const StarIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const CheckIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;

export default Register;
