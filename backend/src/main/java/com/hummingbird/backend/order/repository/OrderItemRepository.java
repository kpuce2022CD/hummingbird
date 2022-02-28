package com.hummingbird.backend.order.repository;

import com.hummingbird.backend.order.domain.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {
}
