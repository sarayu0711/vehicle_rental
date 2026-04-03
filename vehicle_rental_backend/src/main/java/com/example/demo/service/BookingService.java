package com.example.demo.service;

import com.example.demo.model.Booking;
import com.example.demo.model.BookingRequest;
import com.example.demo.model.User;
import com.example.demo.model.Vehicle;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository,
                          VehicleRepository vehicleRepository,
                          UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.vehicleRepository = vehicleRepository;
        this.userRepository = userRepository;
    }

    // Create a new booking
    public Booking createBooking(BookingRequest request) {

        // Find user
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Find vehicle
        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        // Check if vehicle is available
        if (!vehicle.isAvailable()) {
            throw new RuntimeException("Vehicle is not available");
        }

        // Calculate number of days
        long days = ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate());
        if (days <= 0) {
            throw new RuntimeException("End date must be after start date");
        }

        // Calculate total amount
        int totalAmount = (int) days * vehicle.getPricePerDay();

        // Create booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setVehicle(vehicle);
        booking.setStartDate(request.getStartDate());
        booking.setEndDate(request.getEndDate());
        booking.setTotalAmount(totalAmount);
        booking.setStatus("CONFIRMED");

        // Mark vehicle as unavailable
        vehicle.setAvailable(false);
        vehicleRepository.save(vehicle);

        return bookingRepository.save(booking);
    }

    // Get all bookings (Admin)
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get bookings of a specific user
    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    // Cancel a booking
    public Booking cancelBooking(Long bookingId) {
        Optional<Booking> optional = bookingRepository.findById(bookingId);
        if (optional.isPresent()) {
            Booking booking = optional.get();
            booking.setStatus("CANCELLED");

            // Make the vehicle available again
            Vehicle vehicle = booking.getVehicle();
            vehicle.setAvailable(true);
            vehicleRepository.save(vehicle);

            return bookingRepository.save(booking);
        }
        throw new RuntimeException("Booking not found");
    }
}
