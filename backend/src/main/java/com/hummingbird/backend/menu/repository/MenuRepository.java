package com.hummingbird.backend.menu.repository;

import com.hummingbird.backend.menu.domain.Menu;
import com.hummingbird.backend.user.domain.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface MenuRepository extends JpaRepository<Menu,Long> {
    List<Menu> findAllByOwner(Owner owner);
//    List<Menu> findByUser_Id(@Param(value = "userID") Long userID);
}
