package com.hummingbird.backend.order.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.order.dto.OrderItemBillInfo;
import com.hummingbird.backend.order.dto.OrderItemInfo;
import lombok.*;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Getter
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

    @Column(name = "food_price", nullable = false)
    private int foodPrice;


    @Enumerated(EnumType.STRING)
    @Column(name = "status",length = 30, nullable = false)
    private OrderItemStatus status = OrderItemStatus.DOING;

    @Builder
    public OrderItem(Food food, Order order, int foodPrice) {
        this.food = food;
        this.order = order;
        this.foodPrice = foodPrice;
    }

    public OrderItemBillInfo toEntity(int tableNum, LocalDateTime orderDate){
        return OrderItemBillInfo
                .builder()
                .tableNum(tableNum)
                .orderDate(orderDate)
                .foodName(food.getName())
                .status(status)
                .build();
    }

    public void doingItem(){
        this.status = OrderItemStatus.DOING;
    }

    public void doneItem(){
        this.status = OrderItemStatus.DONE;
    }

    public void cancelItem(){
        this.status = OrderItemStatus.CANCEL;
    }

}