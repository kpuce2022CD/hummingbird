package com.hummingbird.backend.repository;

import com.hummingbird.backend.domain.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food,Long> {
}
