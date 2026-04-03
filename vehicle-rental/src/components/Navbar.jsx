import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">🚗</span>
        <span className="brand-text">RideEasy</span>
      </Link>

      <div className="navbar-links">
        <Link to="/vehicles" className={`nav-link ${isActive("/vehicles") ? "active" : ""}`}>
          Browse Vehicles
        </Link>

        {user ? (
          <>
            {user.role === "ADMIN" ? (
              <Link to="/admin" className={`nav-link ${isActive("/admin") ? "active" : ""}`}>
                Admin Panel
              </Link>
            ) : (
              <Link to="/my-bookings" className={`nav-link ${isActive("/my-bookings") ? "active" : ""}`}>
                My Bookings
              </Link>
            )}
            <div className="nav-user">
              <span className="user-greeting">Hi, {user.name.split(" ")[0]}!</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="nav-auth">
            <Link to="/login" className="btn-nav-login">Login</Link>
            <Link to="/register" className="btn-nav-register">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
