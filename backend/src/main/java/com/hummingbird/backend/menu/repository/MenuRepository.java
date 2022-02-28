package com.hummingbird.backend.menu.repository;

import com.hummingbird.backend.menu.domain.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface MenuRepository extends JpaRepository<Menu,Long> {
//    List<Menu> findByUser_Id(@Param(value = "userID") Long userID);
}
