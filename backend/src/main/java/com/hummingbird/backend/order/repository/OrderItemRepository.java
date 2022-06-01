package com.hummingbird.backend.order.repository;

import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.order.domain.OrderItem;
import com.hummingbird.backend.order.domain.OrderItemStatus;
import com.hummingbird.backend.owner.domain.Owner;
import com.hummingbird.backend.owner.repository.OwnerRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {
    List<OrderItem> findAllByStatusAndOrder(OrderItemStatus status, Order order);
    List<OrderItem> findAllByOrder(Order order);
    List<OrderItem> findAllByOrder_Owner(Owner owner);
    List<OrderItem> findAllByStatusAndOrder_OwnerAndOrder_OrderDateBetween(OrderItemStatus status, Owner owner, LocalDateTime start, LocalDateTime end);

}
