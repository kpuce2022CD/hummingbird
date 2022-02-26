package com.hummingbird.backend.order.domain;

import com.hummingbird.backend.shop.domain.Shop;
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

    @OneToOne(fetch = LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "shop_id")
    private Shop shop;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status",length = 30, nullable = false)
    private OrderStatus orderStatus;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();

    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;

    @Builder
    public Order(Long orderId, Customer customer, Shop shop, OrderStatus orderStatus, List<OrderItem> orderItems) {
        this.orderId = orderId;
        this.customer = customer;
        this.shop = shop;
        this.orderStatus = orderStatus;
        this.orderItems = orderItems;
        this.orderDate = LocalDateTime.now();
    }

    public static Order createOrder(Customer customerReference, Shop shopReference){
        return Order
                .builder()
                .customer(customerReference)
                .shop(shopReference)
                .orderStatus(OrderStatus.SEND)
                .build();
    }
}
