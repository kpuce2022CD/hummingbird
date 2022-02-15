package com.hummingbird.backend.repository;

import com.hummingbird.backend.domain.Category;
import com.hummingbird.backend.domain.Food;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food,Long> {
    interface CategoryCustomRepository {
        Optional<Category> findByName(String name);
        Boolean isPresent(String name);
    }
}
