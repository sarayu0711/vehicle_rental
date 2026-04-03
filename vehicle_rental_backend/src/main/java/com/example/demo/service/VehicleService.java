package com.example.demo.service;

import com.example.demo.model.Vehicle;
import com.example.demo.repository.VehicleRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public List<Vehicle> getAvailableVehicles() {
        return vehicleRepository.findByAvailable(true);
    }

    public Vehicle addVehicle(Vehicle vehicle) {
    	String imageUrl = vehicle.getImageUrl();

    	if (imageUrl != null && imageUrl.contains("localhost")) {
    	    imageUrl = imageUrl.replace(
    	        "http://localhost:8080",
    	        "https://vehiclerental-production-4632.up.railway.app"
    	    );
    	}

    	vehicle.setImageUrl(imageUrl);

    	return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicle(Long id, Vehicle updatedVehicle) {
        Optional<Vehicle> optional = vehicleRepository.findById(id);
        if (optional.isPresent()) {
            Vehicle vehicle = optional.get();
            vehicle.setName(updatedVehicle.getName());
            vehicle.setNumberPlate(updatedVehicle.getNumberPlate());
            vehicle.setType(updatedVehicle.getType());
            vehicle.setPricePerDay(updatedVehicle.getPricePerDay());
            String imageUrl = updatedVehicle.getImageUrl();

            if (imageUrl != null && imageUrl.contains("localhost")) {
                imageUrl = imageUrl.replace(
                    "http://localhost:8080",
                    "https://vehiclerental-production-4632.up.railway.app"
                );
            }

            vehicle.setImageUrl(imageUrl);
            vehicle.setAvailable(updatedVehicle.isAvailable());
            return vehicleRepository.save(vehicle);
        }
        throw new RuntimeException("Vehicle not found with id: " + id);
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }

    // ✅ FIXED — disables FK checks, truncates both tables, re-enables
    @Transactional
    public void deleteAllVehicles() {
        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS = 0").executeUpdate();
        entityManager.createNativeQuery("TRUNCATE TABLE bookings").executeUpdate();
        entityManager.createNativeQuery("TRUNCATE TABLE vehicles").executeUpdate();
        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS = 1").executeUpdate();
    }

    public Vehicle toggleAvailability(Long id) {
        Optional<Vehicle> optional = vehicleRepository.findById(id);
        if (optional.isPresent()) {
            Vehicle vehicle = optional.get();
            vehicle.setAvailable(!vehicle.isAvailable());
            return vehicleRepository.save(vehicle);
        }
        throw new RuntimeException("Vehicle not found with id: " + id);
    }
}