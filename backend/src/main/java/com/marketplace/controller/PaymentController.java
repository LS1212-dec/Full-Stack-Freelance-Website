package com.marketplace.controller;

import com.marketplace.model.Order;
import com.marketplace.model.Payment;
import com.marketplace.repository.OrderRepository;
import com.marketplace.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Autowired PaymentRepository paymentRepository;
    @Autowired OrderRepository orderRepository;

    @PostMapping("/{orderId}")
    @PreAuthorize("hasAuthority('ROLE_CLIENT')")
    public ResponseEntity<?> makePayment(@PathVariable Long orderId, @RequestBody Double amount) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order == null) return ResponseEntity.notFound().build();

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(amount);
        payment.setPaymentMethod("CREDIT_CARD");
        payment.setStatus("SUCCESS");

        order.setStatus("IN_PROGRESS");
        orderRepository.save(order);
        
        return ResponseEntity.ok(paymentRepository.save(payment));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getPaymentDetails(@PathVariable Long orderId) {
        Payment payment = paymentRepository.findByOrderId(orderId);
        if (payment == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(payment);
    }
}
