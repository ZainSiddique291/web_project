import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, Users, Heart, Award, ArrowRight } from 'lucide-react';
import { statsApi } from '../api/api';
import './About.css';

const About = () => {
  const [stats, setStats] = useState({
    verifiedWorkers: 2500,
    jobsCompleted: 15000,
    averageRating: 4.8,
    serviceCategories: 12,
  });

  useEffect(() => {
    statsApi.getPlatform().then((res) => setStats(res.data)).catch(() => {});
  }, []);

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <div className="badge about-page-badge">OUR STORY</div>
          <h1 className="about-title">
            Bridging the Gap Between <span className="highlight">Talent</span> and <span className="highlight">Opportunity</span>
          </h1>
          <p className="about-subtitle">
            Founded in 2023, SkillBridge is Pakistan&apos;s fastest-growing platform connecting verified local service professionals with customers in their neighborhoods.
          </p>
        </div>
      </div>

      <div className="container about-content">
        <div className="story-section">
          <div className="story-text">
            <h2>How it Started</h2>
            <p>
              In Pakistan, finding reliable local help—whether it&apos;s an electrician, tutor, plumber, or technician—has historically been a challenge of word-of-mouth and uncertainty. At the same time, thousands of skilled workers lacked a consistent stream of jobs and visibility in their areas.
            </p>
            <p>
              SkillBridge was born to solve both problems. We built a platform that allows professionals to showcase their credentials, verification badges, ratings, and skills, while giving households a safe, verified channel to hire specialists within 30 minutes.
            </p>
            <Link to="/services" className="btn-primary about-cta">
              Explore Services <ArrowRight size={16} />
            </Link>
          </div>
          <div className="story-stats-grid">
            <div className="story-stat-card glass">
              <h3>{stats.verifiedWorkers.toLocaleString()}+</h3>
              <p>Verified Professionals</p>
            </div>
            <div className="story-stat-card glass">
              <h3>{stats.jobsCompleted.toLocaleString()}+</h3>
              <p>Jobs Completed</p>
            </div>
            <div className="story-stat-card glass">
              <h3>{stats.averageRating} / 5</h3>
              <p>Average Customer Rating</p>
            </div>
            <div className="story-stat-card glass">
              <h3>{stats.serviceCategories}+</h3>
              <p>Service Categories</p>
            </div>
          </div>
        </div>

        <div className="mission-vision-section">
          <div className="mv-card glass">
            <div className="mv-icon bg-orange-icon"><Target size={24} /></div>
            <h3>Our Mission</h3>
            <p>
              To empower local service providers with digital tools to expand their business, while providing clients access to background-checked, trusted, and efficient professionals.
            </p>
          </div>
          <div className="mv-card glass">
            <div className="mv-icon bg-teal-icon"><Users size={24} /></div>
            <h3>Our Vision</h3>
            <p>
              To become the leading platform for local services in South Asia, creating thousands of micro-entrepreneurial opportunities and making home services secure, simple, and reliable.
            </p>
          </div>
        </div>

        <div className="values-section">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <Award size={32} className="value-icon text-peach" />
              <h4>Trust & Transparency</h4>
              <p>We perform rigorous background checks and display honest reviews from real customers.</p>
            </div>
            <div className="value-card">
              <Heart size={32} className="value-icon text-teal" />
              <h4>Community First</h4>
              <p>We build connections that support local economies and foster neighborly trust.</p>
            </div>
            <div className="value-card">
              <Target size={32} className="value-icon text-blue" />
              <h4>Quality Excellence</h4>
              <p>Every professional goes through skill matching to ensure top-notch delivery.</p>
            </div>
          </div>
        </div>

        <div className="about-contact-cta glass">
          <h3>Ready to get started?</h3>
          <p>Join as a customer or register as a skilled worker today.</p>
          <div className="about-cta-btns">
            <Link to="/register" className="btn-primary">Get Started</Link>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
