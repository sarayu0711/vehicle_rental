package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // POST /register
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody User user) {
        String result = authService.register(user);
        Map<String, String> response = new HashMap<>();

        switch (result) {
            case "SUCCESS":
                response.put("message", "Registration successful");
                return ResponseEntity.ok(response);
            case "EMAIL_EXISTS":
                response.put("message", "Email already registered");
                return ResponseEntity.badRequest().body(response);
            case "INVALID_AADHAR":
                response.put("message", "Aadhar number must be exactly 12 digits");
                return ResponseEntity.badRequest().body(response);
            case "INVALID_LICENSE":
                response.put("message", "License number must be at least 10 characters");
                return ResponseEntity.badRequest().body(response);
            default:
                response.put("message", "Registration failed");
                return ResponseEntity.internalServerError().body(response);
        }
    }

    // POST /login
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        User user = authService.login(email, password);
        Map<String, Object> response = new HashMap<>();

        if (user != null) {
            response.put("message", "Login successful");
            response.put("userId", user.getId());
            response.put("name", user.getName());
            response.put("role", user.getRole());
            response.put("email", user.getEmail());
            return ResponseEntity.ok(response);
        }

        response.put("message", "Invalid email or password");
        return ResponseEntity.status(401).body(response);
    }
}
