import { useEffect, useState } from "react";
import { getAllVehicles, addVehicle, deleteVehicle, toggleVehicleAvailability, getAllBookings } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EMPTY_VEHICLE = { name: "", numberPlate: "", type: "Car", pricePerDay: "", imageUrl: "", available: true };

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("vehicles");
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState(EMPTY_VEHICLE);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!user || user.role !== "ADMIN") { navigate("/"); return; }
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [v, b] = await Promise.all([getAllVehicles(), getAllBookings()]);
    setVehicles(v);
    setBookings(b);
    setLoading(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await addVehicle({ ...form, pricePerDay: parseInt(form.pricePerDay) });
    setForm(EMPTY_VEHICLE);
    setMsg("✅ Vehicle added successfully!");
    fetchAll();
    setTimeout(() => setMsg(""), 3000);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this vehicle?")) return;
    await deleteVehicle(id);
    fetchAll();
  };

  const handleToggle = async (id) => {
    await toggleVehicleAvailability(id);
    fetchAll();
  };

  if (loading) return <div className="page-loading">Loading admin panel...</div>;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>⚙️ Admin Panel</h1>
        <p>Manage vehicles and bookings</p>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        <div className="admin-stat">
          <strong>{vehicles.length}</strong>
          <span>Total Vehicles</span>
        </div>
        <div className="admin-stat">
          <strong>{vehicles.filter(v => v.available).length}</strong>
          <span>Available</span>
        </div>
        <div className="admin-stat">
          <strong>{bookings.length}</strong>
          <span>Total Bookings</span>
        </div>
        <div className="admin-stat">
          <strong>{bookings.filter(b => b.status === "CONFIRMED").length}</strong>
          <span>Active Bookings</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button className={`admin-tab ${tab === "vehicles" ? "active" : ""}`} onClick={() => setTab("vehicles")}>
          🚗 Vehicles
        </button>
        <button className={`admin-tab ${tab === "add" ? "active" : ""}`} onClick={() => setTab("add")}>
          ➕ Add Vehicle
        </button>
        <button className={`admin-tab ${tab === "bookings" ? "active" : ""}`} onClick={() => setTab("bookings")}>
          📋 Bookings
        </button>
      </div>

      {msg && <div className="success-banner">{msg}</div>}

      {/* Vehicles Tab */}
      {tab === "vehicles" && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Plate</th>
                <th>Type</th>
                <th>Price/Day</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id}>
                  <td><strong>{v.name}</strong></td>
                  <td>{v.numberPlate}</td>
                  <td>{v.type}</td>
                  <td>₹{v.pricePerDay}</td>
                  <td>
                    <span className={`status-badge ${v.available ? "available" : "not-available"}`}>
                      {v.available ? "Available" : "Booked"}
                    </span>
                  </td>
                  <td className="action-btns">
                    <button className="btn-toggle" onClick={() => handleToggle(v.id)}>
                      {v.available ? "Mark Booked" : "Mark Available"}
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(v.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Vehicle Tab */}
      {tab === "add" && (
        <div className="add-vehicle-form">
          <h2>Add New Vehicle</h2>
          <form onSubmit={handleAdd}>
            <div className="form-row">
              <div className="form-group">
                <label>Vehicle Name</label>
                <input className="form-input" placeholder="e.g. Honda City"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Number Plate</label>
                <input className="form-input" placeholder="e.g. TS09AB1234"
                  value={form.numberPlate} onChange={e => setForm({ ...form, numberPlate: e.target.value })} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Type</label>
                <select className="form-input" value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option>Car</option>
                  <option>Bike</option>
                  <option>Scooter</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price Per Day (₹)</label>
                <input type="number" className="form-input" placeholder="e.g. 500"
                  value={form.pricePerDay} onChange={e => setForm({ ...form, pricePerDay: e.target.value })} required />
              </div>
            </div>
            <div className="form-group">
              <label>Image URL (optional)</label>
              <input className="form-input" placeholder="https://example.com/car.jpg"
                value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
            </div>
            <button type="submit" className="btn-auth">Add Vehicle →</button>
          </form>
        </div>
      )}

      {/* Bookings Tab */}
      {tab === "bookings" && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Vehicle</th>
                <th>Dates</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>#{b.id}</td>
                  <td>{b.user?.name || "-"}</td>
                  <td>{b.vehicle?.name || "-"}</td>
                  <td>{b.startDate} → {b.endDate}</td>
                  <td>₹{b.totalAmount}</td>
                  <td>
                    <span className={`status-badge ${b.status === "CONFIRMED" ? "available" : "not-available"}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
