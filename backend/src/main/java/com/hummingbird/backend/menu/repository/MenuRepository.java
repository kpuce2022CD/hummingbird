package com.hummingbird.backend.menu.repository;

import com.hummingbird.backend.menu.domain.Menu;
import com.hummingbird.backend.owner.domain.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface MenuRepository extends JpaRepository<Menu,Long> {
    List<Menu> findAllByOwner(Owner owner);
//    List<Menu> findByUser_Id(@Param(value = "userID") Long userID);
}
