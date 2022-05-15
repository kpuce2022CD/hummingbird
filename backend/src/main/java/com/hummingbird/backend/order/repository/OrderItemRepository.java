package com.hummingbird.backend.order.repository;

import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.order.domain.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {
    List<OrderItem> findAllByStatusAndOrder(String status,Order order);
    List<OrderItem> findAllByOrder(Order order);
}
