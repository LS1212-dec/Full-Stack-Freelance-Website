package com.marketplace.controller;

import com.marketplace.model.Gig;
import com.marketplace.model.User;
import com.marketplace.repository.GigRepository;
import com.marketplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/gigs")
public class GigController {

    @Autowired GigRepository gigRepository;
    @Autowired UserRepository userRepository;

    @GetMapping
    public ResponseEntity<Page<Gig>> getAllGigs(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        Pageable paging = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return ResponseEntity.ok(gigRepository.findAll(paging));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Gig>> searchGigs(
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) String category,
        @RequestParam(required = false) Double minPrice,
        @RequestParam(required = false) Double maxPrice,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "9") int size,
        @RequestParam(defaultValue = "createdAt") String sortBy,
        @RequestParam(defaultValue = "desc") String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() :
                    Sort.by(sortBy).descending();
        Pageable paging = PageRequest.of(page, size, sort);
        Page<Gig> resultPage = gigRepository.searchGigs(keyword, category, minPrice, maxPrice, paging);
        return ResponseEntity.ok(resultPage);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_FREELANCER')")
    public ResponseEntity<?> createGig(@RequestBody Gig gigRequest) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User freelancer = userRepository.findByUsername(username).orElse(null);
        
        if (freelancer == null) {
            return ResponseEntity.badRequest().body("Freelancer not found.");
        }

        Gig gig = new Gig();
        gig.setTitle(gigRequest.getTitle());
        gig.setDescription(gigRequest.getDescription());
        gig.setPrice(gigRequest.getPrice());
        gig.setCategory(gigRequest.getCategory());
        gig.setSkills(gigRequest.getSkills());
        gig.setTags(gigRequest.getTags());
        gig.setRating(5.0);
        gig.setReviewCount(0);
        gig.setFreelancer(freelancer);
        
        return ResponseEntity.ok(gigRepository.save(gig));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGigById(@PathVariable Long id) {
        return gigRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/freelancer/{freelancerId}")
    public List<Gig> getGigsByFreelancer(@PathVariable Long freelancerId) {
        return gigRepository.findByFreelancerId(freelancerId);
    }
}
