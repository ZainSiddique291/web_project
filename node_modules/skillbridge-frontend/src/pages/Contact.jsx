import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { contactApi, statsApi } from '../api/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [settings, setSettings] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    statsApi.getSettings().then((res) => setSettings(res.data)).catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await contactApi.submit(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <div className="badge contact-page-badge">CONTACT US</div>
          <h1 className="contact-title">
            How Can We <span className="highlight">Help</span> You?
          </h1>
          <p className="contact-subtitle">
            Have questions about bookings, registering as a provider, or feedback? Get in touch with our team.
          </p>
        </div>
      </div>

      <div className="container contact-container">
        <div className="contact-info-panel">
          <h2>Contact Information</h2>
          <p className="panel-desc">
            Feel free to contact us via email or phone. Our support team is ready to assist you.
          </p>

          <div className="contact-info-list">
            <a href={`tel:${settings?.supportPhone || '+923001234567'}`} className="contact-info-item contact-link-item">
              <div className="info-icon"><Phone size={20} /></div>
              <div className="info-text">
                <h4>Call Us</h4>
                <p>{settings?.supportPhone || '+92 300 1234567'}</p>
              </div>
            </a>

            <a href={`mailto:${settings?.supportEmail || 'support@skillbridge.pk'}`} className="contact-info-item contact-link-item">
              <div className="info-icon"><Mail size={20} /></div>
              <div className="info-text">
                <h4>Email Support</h4>
                <p>{settings?.supportEmail || 'support@skillbridge.pk'}</p>
              </div>
            </a>

            <div className="contact-info-item">
              <div className="info-icon"><MapPin size={20} /></div>
              <div className="info-text">
                <h4>Our Location</h4>
                <p>{settings?.address || 'Arfa Software Technology Park, Ferozepur Road, Lahore, Pakistan'}</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="info-icon"><Clock size={20} /></div>
              <div className="info-text">
                <h4>Support Hours</h4>
                <p>{settings?.supportHours || 'Monday - Saturday: 9:00 AM - 7:00 PM'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-panel glass">
          {submitted ? (
            <div className="submit-success">
              <CheckCircle size={48} className="success-icon" />
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out to SkillBridge. A member of our support team will respond to you shortly.</p>
              <button type="button" onClick={() => setSubmitted(false)} className="btn-primary success-btn">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <h3>Send a Message</h3>
              <p>Fill out the form below and we will get back to you within 24 hours.</p>

              {error && (
                <div className="contact-error">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ahmad Raza"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ahmad@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Booking verification inquiry"
                  required
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows="5"
                  required
                />
              </div>

              <button type="submit" className="btn-primary contact-submit-btn" disabled={loading}>
                {loading ? 'Sending...' : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
