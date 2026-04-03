import { useState, useEffect } from "react";
import { getAvailableVehicles } from "../api/api";
import VehicleCard from "../components/VehicleCard";
import BookingModal from "../components/BookingModal";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    const data = await getAvailableVehicles();
    setVehicles(data);
    setLoading(false);
  };

  const filtered = filter === "All"
    ? vehicles
    : vehicles.filter((v) => v.type === filter);

  const handleBookSuccess = (booking) => {
    setSelectedVehicle(null);
    setSuccessMsg(`🎉 Booking confirmed! Total: ₹${booking.totalAmount}`);
    fetchVehicles();
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <div className="vehicles-page">
      <div className="vehicles-header">
        <h1>Available Vehicles</h1>
        <p>Choose from our fleet of well-maintained vehicles</p>
      </div>

      {/* Filter tabs */}
      <div className="filter-tabs">
        {["All", "Car", "Bike", "Scooter"].map((type) => (
          <button
            key={type}
            className={`filter-tab ${filter === type ? "active" : ""}`}
            onClick={() => setFilter(type)}
          >
            {type === "All" && "🚘 "}
            {type === "Car" && "🚗 "}
            {type === "Bike" && "🏍️ "}
            {type === "Scooter" && "🛵 "}
            {type}
          </button>
        ))}
      </div>

      {successMsg && (
        <div className="success-banner">{successMsg}</div>
      )}

      {loading ? (
        <div className="loading-grid">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="skeleton-card" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <span>😔</span>
          <p>No vehicles available in this category right now.</p>
        </div>
      ) : (
        <div className="vehicles-grid">
          {filtered.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              onBook={setSelectedVehicle}
            />
          ))}
        </div>
      )}

      {selectedVehicle && (
        <BookingModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          onSuccess={handleBookSuccess}
        />
      )}
    </div>
  );
}
