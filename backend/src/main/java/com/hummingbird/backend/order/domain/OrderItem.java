package com.hummingbird.backend.order.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.order.dto.OrderItemInfo;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Getter @Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "food_id")
    private Food food;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(name = "order_price", nullable = false)
    private int orderPrice;

    @Column(name = "count", nullable = false)
    private int count;

    @Builder
    public OrderItem(Food food, Order order, int orderPrice, int count) {
        this.food = food;
        this.order = order;
        this.orderPrice = orderPrice;
        this.count = count;
    }

}