package com.example.demo.repository;

import com.example.demo.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Get all bookings for a specific user
    List<Booking> findByUserId(Long userId);

    // Get all bookings for a specific vehicle
    List<Booking> findByVehicleId(Long vehicleId);
}
