package com.hummingbird.backend.food.repository;

import com.hummingbird.backend.food.domain.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food,Long> {
    List<Food> findByCategory_Id(@Param(value = "categoryID") Long categoryID);

    Optional<Food> getFoodById(Long id);
//    List<Food> findByMenu_Id(@Param(value = "menuID") Long menuID);
}
