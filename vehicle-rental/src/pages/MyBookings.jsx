import { useEffect, useState } from "react";
import { getUserBookings, cancelBooking } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const STATUS_COLORS = {
  CONFIRMED: { bg: "#d1fae5", color: "#065f46" },
  CANCELLED: { bg: "#fee2e2", color: "#991b1b" },
  COMPLETED: { bg: "#dbeafe", color: "#1e40af" },
};

export default function MyBookings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const data = await getUserBookings(user.userId);
    setBookings(data);
    setLoading(false);
  };

  const handleCancel = async (id) => {
    if (!confirm("Cancel this booking?")) return;
    await cancelBooking(id);
    fetchBookings();
  };

  if (loading) return <div className="page-loading">Loading your bookings...</div>;

  return (
    <div className="bookings-page">
      <div className="bookings-header">
        <h1>My Bookings</h1>
        <p>All your rental history in one place</p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <span>📋</span>
          <p>No bookings yet. <a href="/vehicles">Browse vehicles →</a></p>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((b) => (
            <div key={b.id} className="booking-card">
              <div className="booking-vehicle-info">
                <div className="bv-icon">🚗</div>
                <div>
                  <h3>{b.vehicle?.name || "Vehicle"}</h3>
                  <p className="bv-plate">{b.vehicle?.numberPlate}</p>
                </div>
              </div>

              <div className="booking-dates">
                <div className="date-item">
                  <span className="date-label">From</span>
                  <span className="date-value">{b.startDate}</span>
                </div>
                <div className="date-arrow">→</div>
                <div className="date-item">
                  <span className="date-label">To</span>
                  <span className="date-value">{b.endDate}</span>
                </div>
              </div>

              <div className="booking-meta">
                <span className="booking-amount">₹{b.totalAmount}</span>
                <span
                  className="booking-status"
                  style={STATUS_COLORS[b.status] || {}}
                >
                  {b.status}
                </span>
              </div>

              {b.status === "CONFIRMED" && (
                <button
                  className="btn-cancel"
                  onClick={() => handleCancel(b.id)}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
