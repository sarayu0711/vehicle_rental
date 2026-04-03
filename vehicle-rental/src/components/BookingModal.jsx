import { useState } from "react";
import { createBooking } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function BookingModal({ vehicle, onClose, onSuccess }) {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const calcDays = () => {
    if (!startDate || !endDate) return 0;
    const diff = new Date(endDate) - new Date(startDate);
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const days = calcDays();
  const total = days * vehicle.pricePerDay;

  const handleSubmit = async () => {
    if (!startDate || !endDate) return setError("Please select both dates");
    if (days <= 0) return setError("End date must be after start date");

    setLoading(true);
    setError("");
    const { status, data } = await createBooking({
      userId: user.userId,
      vehicleId: vehicle.id,
      startDate,
      endDate,
    });
    setLoading(false);

    if (status === 200) {
      onSuccess(data);
    } else {
      setError(typeof data === "string" ? data : "Booking failed. Try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="modal-title">Book Vehicle</h2>

        <div className="modal-vehicle-info">
          <span className="modal-vehicle-name">{vehicle.name}</span>
          <span className="modal-vehicle-price">₹{vehicle.pricePerDay}/day</span>
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            min={today}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            min={startDate || today}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="form-input"
          />
        </div>

        {days > 0 && (
          <div className="booking-summary">
            <div className="summary-row">
              <span>Duration</span>
              <span>{days} day{days > 1 ? "s" : ""}</span>
            </div>
            <div className="summary-row total">
              <span>Total Amount</span>
              <span>₹{total}</span>
            </div>
          </div>
        )}

        {error && <p className="form-error">{error}</p>}

        <button className="btn-confirm" onClick={handleSubmit} disabled={loading}>
          {loading ? "Confirming..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
