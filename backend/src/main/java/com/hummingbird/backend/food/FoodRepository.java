package com.hummingbird.backend.food;

import com.hummingbird.backend.domain.Category;
import com.hummingbird.backend.domain.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food,Long> {
    List<Food> findByCategory_Id(@Param(value = "categoryID") Long categoryID);
//    List<Food> findByMenu_Id(@Param(value = "menuID") Long menuID);
}
