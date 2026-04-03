import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-circle c1" />
          <div className="hero-circle c2" />
          <div className="hero-circle c3" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">🇮🇳 Trusted Vehicle Rental</div>
          <h1 className="hero-title">
            Rent Your Perfect<br />
            <span className="hero-highlight">Ride Today</span>
          </h1>
          <p className="hero-subtitle">
            Cars, Bikes & Scooters available at your fingertips.<br />
            Affordable daily rates. Book in minutes.
          </p>
          <div className="hero-actions">
            <Link to="/vehicles" className="btn-primary">
              Browse Vehicles →
            </Link>
            <Link to="/register" className="btn-secondary">
              Create Account
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card floating">
            <div className="hc-icon">🚗</div>
            <div className="hc-text">
              <strong>Honda City</strong>
              <span>₹2500/day</span>
            </div>
          </div>
          <div className="hero-card floating delay1">
            <div className="hc-icon">🏍️</div>
            <div className="hc-text">
              <strong>Yamaha FZ</strong>
              <span>₹500/day</span>
            </div>
          </div>
          <div className="hero-card floating delay2">
            <div className="hc-icon">🛵</div>
            <div className="hc-text">
              <strong>Honda Activa</strong>
              <span>₹300/day</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="stat"><strong>500+</strong><span>Vehicles</span></div>
        <div className="stat-divider" />
        <div className="stat"><strong>10,000+</strong><span>Happy Riders</span></div>
        <div className="stat-divider" />
        <div className="stat"><strong>50+</strong><span>Cities</span></div>
        <div className="stat-divider" />
        <div className="stat"><strong>24/7</strong><span>Support</span></div>
      </section>

      {/* How it works */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Book your ride in 3 simple steps</p>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-num">01</div>
            <div className="step-icon">👤</div>
            <h3>Create Account</h3>
            <p>Register with your Aadhar & License details in under 2 minutes</p>
          </div>
          <div className="step-card">
            <div className="step-num">02</div>
            <div className="step-icon">🔍</div>
            <h3>Browse & Choose</h3>
            <p>Filter by type — Cars, Bikes, Scooters. See prices & availability</p>
          </div>
          <div className="step-card">
            <div className="step-num">03</div>
            <div className="step-icon">✅</div>
            <h3>Book & Ride</h3>
            <p>Pick your dates, confirm booking, and hit the road!</p>
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="vehicle-types">
        <h2 className="section-title">What We Offer</h2>
        <div className="types-grid">
          <Link to="/vehicles" className="type-card car">
            <span className="type-emoji">🚗</span>
            <h3>Cars</h3>
            <p>From ₹1,200/day</p>
          </Link>
          <Link to="/vehicles" className="type-card bike">
            <span className="type-emoji">🏍️</span>
            <h3>Bikes</h3>
            <p>From ₹400/day</p>
          </Link>
          <Link to="/vehicles" className="type-card scooter">
            <span className="type-emoji">🛵</span>
            <h3>Scooters</h3>
            <p>From ₹250/day</p>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Ride?</h2>
          <p>Join thousands of happy riders across India</p>
          <Link to="/register" className="btn-primary">
            Get Started Free →
          </Link>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 RideEasy. Built with ❤️ in India.</p>
      </footer>
    </div>
  );
}
