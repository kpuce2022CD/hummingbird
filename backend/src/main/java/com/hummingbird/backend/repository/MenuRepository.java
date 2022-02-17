package com.hummingbird.backend.repository;

import com.hummingbird.backend.domain.Food;
import com.hummingbird.backend.domain.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface MenuRepository extends JpaRepository<Menu,Long> {
    List<Menu> findByUser_Id(@Param(value = "userID") Long userID);
}
