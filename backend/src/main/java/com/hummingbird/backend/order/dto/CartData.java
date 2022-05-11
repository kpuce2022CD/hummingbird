package com.hummingbird.backend.order.dto;

import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.order.domain.OrderItem;
import lombok.Builder;
import lombok.Getter;


@Getter
public class CartData {
    private Long foodId;
    private int count;

    public CartData() {
    }

    @Builder
    public CartData( Long foodId, int count) {

        this.foodId = foodId;
        this.count = count;
    }
//
//    public OrderItem toEntity(Food food, Order order){
//        return OrderItem
//                .builder()
//                .food(food)
//                .order(order)
//                .foodPrice(foodPrice)
//                .build();
//    }
}
