package com.example.demo.repository;

import com.example.demo.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    // Get only available vehicles
    List<Vehicle> findByAvailable(boolean available);

    // Get vehicles by type (Car, Bike, Scooter)
    List<Vehicle> findByType(String type);
}
