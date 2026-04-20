package com.marketplace.repository;

import com.marketplace.model.Gig;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface GigRepository extends JpaRepository<Gig, Long> {
    List<Gig> findByFreelancerId(Long freelancerId);

    @Query("SELECT g FROM Gig g WHERE " +
           "(:keyword IS NULL OR LOWER(g.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(g.description) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND (:category IS NULL OR g.category = :category) " +
           "AND (:minPrice IS NULL OR g.price >= :minPrice) " +
           "AND (:maxPrice IS NULL OR g.price <= :maxPrice)")
    Page<Gig> searchGigs(@Param("keyword") String keyword, 
                         @Param("category") String category, 
                         @Param("minPrice") Double minPrice, 
                         @Param("maxPrice") Double maxPrice, 
                         Pageable pageable);
}
