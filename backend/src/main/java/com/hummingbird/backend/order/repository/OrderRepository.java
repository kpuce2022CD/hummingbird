package com.hummingbird.backend.order.repository;

import com.hummingbird.backend.order.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Long> {
}
