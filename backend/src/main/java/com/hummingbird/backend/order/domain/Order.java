package com.hummingbird.backend.order.domain;

import com.hummingbird.backend.owner.domain.Owner;
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
    @JoinColumn(name = "owner_id")
    private Owner owner;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status",length = 30, nullable = false)
    private OrderStatus orderStatus;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();

    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;

    @Column(name = "imp_uid",nullable = false)
    private String impUid;

    @Builder
    public Order(Long orderId, Owner owner, OrderStatus orderStatus, List<OrderItem> orderItems,String impUid) {
        this.orderId = orderId;
        this.owner = owner;
        this.orderStatus = orderStatus;
        this.orderItems = orderItems;
        this.orderDate = LocalDateTime.now();
        this.impUid= impUid;
    }

    public static Order createOrder(Owner ownerReference,String impUid){
        return Order
                .builder()
                .owner(ownerReference)
                .orderStatus(OrderStatus.SEND)
                .impUid(impUid)
                .build();
    }
}
