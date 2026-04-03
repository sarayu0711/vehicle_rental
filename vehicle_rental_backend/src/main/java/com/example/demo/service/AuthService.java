package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register new user
    public String register(User user) {

        // Check if email already used
        if (userRepository.existsByEmail(user.getEmail())) {
            return "EMAIL_EXISTS";
        }

        // Validate Aadhar - must be exactly 12 digits
        if (user.getAadharNumber() == null || !user.getAadharNumber().matches("\\d{12}")) {
            return "INVALID_AADHAR";
        }

        // Validate License - must be at least 10 characters
        if (user.getLicenseNumber() == null || user.getLicenseNumber().length() < 10) {
            return "INVALID_LICENSE";
        }

        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Default role is USER
        user.setRole("USER");

        userRepository.save(user);
        return "SUCCESS";
    }

    // Login
    public User login(String email, String rawPassword) {
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(rawPassword, user.getPassword())) {
            return user;
        }
        return null;
    }
}
