package com.marketplace.config;

import com.marketplace.model.*;
import com.marketplace.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataSeeder.class);

    @Autowired UserRepository userRepository;
    @Autowired GigRepository gigRepository;
    @Autowired OrderRepository orderRepository;
    @Autowired PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            logger.info("Database is empty. Deep Seeding 50+ Mock Items...");
            
            Random random = new Random();
            List<User> freelancers = new ArrayList<>();
            List<User> clients = new ArrayList<>();
            
            for(int i=1; i<=10; i++){
                User f = new User("freelancer" + i, "freelancer"+i+"@test.com", encoder.encode("password123"), Role.ROLE_FREELANCER);
                freelancers.add(userRepository.save(f));
            }
            for(int i=1; i<=10; i++){
                User c = new User("client" + i, "client"+i+"@test.com", encoder.encode("password123"), Role.ROLE_CLIENT);
                clients.add(userRepository.save(c));
            }

            String[] categories = {"Development", "Design", "AI Services", "Marketing", "Writing"};
            String[] skills = {"React, Node.js", "Java, Spring Boot", "Python, Pandas", "Figma, UI/UX", "SEO, Analytics"};

            List<Gig> gigs = new ArrayList<>();
            for (int i=1; i<=55; i++) {
                String cat = categories[i % categories.length];
                String skill = skills[i % skills.length];
                Double price = 50.0 + random.nextInt(450);
                Double rating = 3.0 + random.nextDouble() * 2; // 3.0 to 5.0
                int reviews = 5 + random.nextInt(295);
                
                Gig gig = new Gig(
                    "Professional " + cat + " Service Level " + i,
                    "I will provide exceptional " + cat + " services for your business using high-end workflows and standard compliant techniques. Delivery within 3 days.",
                    price, cat, skill, "pro, expert",
                    Math.round(rating * 10.0) / 10.0, reviews,
                    "https://picsum.photos/seed/" + i + "/400/250",
                    freelancers.get(i % freelancers.size())
                );
                gigs.add(gigRepository.save(gig));
            }

            for(int i=1; i<=20; i++){
                Order o = new Order();
                o.setGig(gigs.get(i % gigs.size()));
                o.setClient(clients.get(i % clients.size()));
                o.setStatus(i % 3 == 0 ? "COMPLETED" : "IN_PROGRESS");
                orderRepository.save(o);
            }

            logger.info("Mock Data Architecture Seeded Successfully.");
        }
    }
}
