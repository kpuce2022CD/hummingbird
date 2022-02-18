package com.hummingbird.backend.repository;

import com.hummingbird.backend.domain.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface MenuRepository extends JpaRepository<Menu,Long> {
}
