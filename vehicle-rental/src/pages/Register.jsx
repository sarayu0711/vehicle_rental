import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", password: "",
    phone: "", aadharNumber: "", licenseNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.aadharNumber.length !== 12 || !/^\d+$/.test(form.aadharNumber)) {
      return setError("Aadhar number must be exactly 12 digits");
    }
    if (form.licenseNumber.length < 10) {
      return setError("License number must be at least 10 characters");
    }

    setLoading(true);
    const { status, data } = await registerUser(form);
    setLoading(false);

    if (status === 200) {
      navigate("/login", { state: { success: "Account created! Please login." } });
    } else {
      setError(data.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-brand">🚗 RideEasy</div>
          <h2>Join RideEasy</h2>
          <p>Register once. Rent anytime, anywhere.</p>
          <div className="auth-perks">
            <div className="perk">✅ Instant booking confirmation</div>
            <div className="perk">✅ Verified vehicles only</div>
            <div className="perk">✅ Secure payments</div>
            <div className="perk">✅ 24/7 support</div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrap">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Fill in your details to get started</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input name="name" placeholder="Sara Kumari" value={form.name}
                  onChange={handleChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input name="phone" placeholder="9876543210" value={form.phone}
                  onChange={handleChange} className="form-input" required />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" placeholder="you@example.com"
                value={form.email} onChange={handleChange} className="form-input" required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="Min. 6 characters"
                value={form.password} onChange={handleChange} className="form-input" required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Aadhar Number</label>
                <input name="aadharNumber" placeholder="12-digit Aadhar"
                  maxLength={12} value={form.aadharNumber}
                  onChange={handleChange} className="form-input" required />
              </div>
              <div className="form-group">
                <label>License Number</label>
                <input name="licenseNumber" placeholder="e.g. TS0120230012345"
                  value={form.licenseNumber} onChange={handleChange}
                  className="form-input" required />
              </div>
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="btn-auth" disabled={loading}>
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
