package com.hummingbird.backend.order.domain;

import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.order.dto.OrderInfoDto;
import com.hummingbird.backend.user.domain.Customer;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Getter
@Entity
@Table(name = "orders")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status",length = 30, nullable = false)
    private OrderStatus orderStatus;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();

    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;

    @Builder
    public Order(Long orderId, Customer customer, OrderStatus orderStatus, List<OrderItem> orderItems) {
        this.orderId = orderId;
        this.customer = customer;
        this.orderStatus = orderStatus;
        this.orderItems = orderItems;
        this.orderDate = LocalDateTime.now();
    }

    public static Order createOrder(Customer customer){
        return Order
                .builder()
                .customer(customer)
                .orderStatus(OrderStatus.SEND)
                .build();
    }
}
