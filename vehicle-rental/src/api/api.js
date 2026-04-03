const BASE_URL = "http://localhost:8080";

// ── Vehicles ──────────────────────────────────────────
export const getAvailableVehicles = async () => {
  const res = await fetch(`${BASE_URL}/vehicles/available`);
  return res.json();
};

export const getAllVehicles = async () => {
  const res = await fetch(`${BASE_URL}/vehicles`);
  return res.json();
};

export const addVehicle = async (vehicle) => {
  const res = await fetch(`${BASE_URL}/vehicles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehicle),
  });
  return res.json();
};

export const updateVehicle = async (id, vehicle) => {
  const res = await fetch(`${BASE_URL}/vehicles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehicle),
  });
  return res.json();
};

export const deleteVehicle = async (id) => {
  await fetch(`${BASE_URL}/vehicles/${id}`, { method: "DELETE" });
};

export const toggleVehicleAvailability = async (id) => {
  const res = await fetch(`${BASE_URL}/vehicles/${id}/toggle`, {
    method: "PATCH",
  });
  return res.json();
};

// ── Auth ──────────────────────────────────────────────
export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return { status: res.status, data: await res.json() };
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return { status: res.status, data: await res.json() };
};

// ── Bookings ──────────────────────────────────────────
export const createBooking = async (bookingData) => {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });
  return { status: res.status, data: await res.json() };
};

export const getUserBookings = async (userId) => {
  const res = await fetch(`${BASE_URL}/bookings/user/${userId}`);
  return res.json();
};

export const getAllBookings = async () => {
  const res = await fetch(`${BASE_URL}/bookings`);
  return res.json();
};

export const cancelBooking = async (bookingId) => {
  const res = await fetch(`${BASE_URL}/bookings/${bookingId}/cancel`, {
    method: "PATCH",
  });
  return res.json();
};
