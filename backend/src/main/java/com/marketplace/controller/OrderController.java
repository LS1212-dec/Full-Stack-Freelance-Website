package com.marketplace.controller;

import com.marketplace.model.Gig;
import com.marketplace.model.Order;
import com.marketplace.model.User;
import com.marketplace.repository.GigRepository;
import com.marketplace.repository.OrderRepository;
import com.marketplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    
    @Autowired OrderRepository orderRepository;
    @Autowired GigRepository gigRepository;
    @Autowired UserRepository userRepository;

    @PostMapping("/{gigId}")
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public ResponseEntity<?> placeOrder(@PathVariable Long gigId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User client = userRepository.findByUsername(username).orElse(null);
        
        Gig gig = gigRepository.findById(gigId).orElse(null);
        if (gig == null || client == null) {
            return ResponseEntity.badRequest().body("Invalid Gig or Client");
        }

        Order order = new Order();
        order.setGig(gig);
        order.setClient(client);
        order.setStatus("PENDING");
        
        return ResponseEntity.ok(orderRepository.save(order));
    }

    @GetMapping("/client")
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public ResponseEntity<?> getClientOrders() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User client = userRepository.findByUsername(username).get();
        return ResponseEntity.ok(orderRepository.findByClientId(client.getId()));
    }

    @GetMapping("/freelancer")
    @PreAuthorize("hasAuthority('ROLE_FREELANCER')")
    public ResponseEntity<?> getFreelancerOrders() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User freelancer = userRepository.findByUsername(username).get();
        return ResponseEntity.ok(orderRepository.findByGigFreelancerId(freelancer.getId()));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasAuthority('ROLE_FREELANCER')")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestBody String status) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null) return ResponseEntity.notFound().build();
        
        order.setStatus(status.replace("\"", ""));
        return ResponseEntity.ok(orderRepository.save(order));
    }
}
