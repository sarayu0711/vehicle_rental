import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ✅ FIXED: match backend values (CAPS)
const TYPE_ICONS = { CAR: "🚗", BIKE: "🏍️", SCOOTER: "🛵" };

export default function VehicleCard({ vehicle, onBook }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBook = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    onBook(vehicle);
  };

  return (
    <div className={`vehicle-card ${!vehicle.available ? "unavailable" : ""}`}>
      
      {/* IMAGE SECTION */}
      <div className="vehicle-img-wrap">
        {vehicle.imageUrl ? (
          <img 
            src={`http://localhost:8080/images/${vehicle.imageUrl}`} 
            alt={vehicle.name} 
            className="vehicle-img" 
          />
        ) : (
          <div className="vehicle-img-placeholder">
            <span>{TYPE_ICONS[vehicle.type] || "🚗"}</span>
          </div>
        )}

        <span className={`badge-availability ${vehicle.available ? "available" : "not-available"}`}>
          {vehicle.available ? "Available" : "Booked"}
        </span>
      </div>

      {/* INFO SECTION */}
      <div className="vehicle-info">
        <div className="vehicle-header">
          <h3 className="vehicle-name">{vehicle.name}</h3>
          <span className="vehicle-type-tag">
            {vehicle.type || "Vehicle"}
          </span>
        </div>

        <p className="vehicle-plate">🪪 {vehicle.numberPlate}</p>

        <div className="vehicle-footer">
          <span className="vehicle-price">
            ₹{vehicle.pricePerDay}
            <span className="per-day">/day</span>
          </span>

          <button
            className={`btn-book ${!vehicle.available ? "btn-disabled" : ""}`}
            onClick={handleBook}
            disabled={!vehicle.available}
          >
            {vehicle.available ? "Book Now" : "Not Available"}
          </button>
        </div>
      </div>
    </div>
  );
}