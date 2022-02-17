package com.hummingbird.backend.repository;

import com.hummingbird.backend.domain.Category;
import com.hummingbird.backend.domain.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    List<Category> findByMenu_Id(@Param(value = "menuID") Long menuID);
}
