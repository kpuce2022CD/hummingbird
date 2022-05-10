package com.hummingbird.backend.order.repository;

import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.owner.domain.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findAllByOrderDateBetweenAndOwner(LocalDateTime start, LocalDateTime end, Owner owner);
}
