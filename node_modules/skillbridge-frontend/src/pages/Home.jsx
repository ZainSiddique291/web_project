import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Lock, CheckCircle2, Star, TrendingUp, ArrowRight } from 'lucide-react';
import { statsApi } from '../api/api';
import './Home.css';

const Home = () => {
  const [stats, setStats] = useState({
    averageRating: 4.8,
    verifiedWorkers: 1500,
    jobsCompleted: 2500,
  });

  useEffect(() => {
    statsApi.getPlatform().then((res) => setStats(res.data)).catch(() => {});
  }, []);

  return (
    <div className="home-page">
      <div className="container hero-container">
        <div className="hero-content">
          <Link to="/about" className="about-badge">
            ABOUT SKILLBRIDGE
          </Link>
          <h1 className="hero-title">
            Empowering Local<br />
            Talent, Connecting<br />
            Communities
          </h1>
          <p className="hero-subtitle">
            Founded in 2023, SkillBridge is Pakistan&apos;s fastest-growing platform dedicated to bridging the gap between skilled workers and customers. We believe in creating economic opportunities for local professionals while providing reliable, trustworthy services to households and businesses across the nation.
          </p>

          <div className="hero-cta-row">
            <Link to="/services" className="btn-primary">
              Find a Professional <ArrowRight size={16} />
            </Link>
            <Link to="/register" className="btn-outline">
              Join as Worker
            </Link>
          </div>

          <div className="features-list">
            <div className="feature-item-home">
              <div className="feature-icon-wrapper bg-peach">
                <Shield size={20} className="icon-peach" />
              </div>
              <div className="feature-text">
                <h3>Background Checked Workers</h3>
                <p>Every professional goes through ID verification & skill test.</p>
              </div>
            </div>
            <div className="feature-item-home">
              <div className="feature-icon-wrapper bg-light-teal">
                <MapPin size={20} className="icon-light-teal" />
              </div>
              <div className="feature-text">
                <h3>Location-based Matching</h3>
                <p>Find experts in your neighborhood, get help within 30 mins.</p>
              </div>
            </div>
            <div className="feature-item-home">
              <div className="feature-icon-wrapper bg-light-blue">
                <Lock size={20} className="icon-light-blue" />
              </div>
              <div className="feature-text">
                <h3>Secure Escrow Payments</h3>
                <p>Pay after work is done — your money is safe with us.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-visuals-home">
          <div className="stats-card-main">
            <div className="stats-row">
              <div className="row-icon-circle bg-solid-green">
                <CheckCircle2 size={24} className="icon-white" />
              </div>
              <div className="row-content">
                <h3>Real customer review</h3>
                <p>&quot;Found an electrician within 10 min, fixed my wiring perfectly.&quot; — Ahsan R.</p>
              </div>
            </div>
            <div className="stats-row">
              <div className="row-icon-circle bg-solid-yellow">
                <Star size={24} className="icon-white" fill="currentColor" />
              </div>
              <div className="row-content">
                <h3>{stats.averageRating} average rating</h3>
                <p>Based on {stats.jobsCompleted?.toLocaleString()}+ completed jobs across Pakistan.</p>
              </div>
            </div>
            <div className="stats-row">
              <div className="row-icon-circle bg-solid-blue">
                <TrendingUp size={24} className="icon-white" />
              </div>
              <div className="row-content">
                <h3>{stats.verifiedWorkers?.toLocaleString()}+ active workers</h3>
                <p>Growing daily with new skilled professionals joining.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
