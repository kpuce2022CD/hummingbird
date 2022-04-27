package com.hummingbird.backend.order.dto;

import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.order.domain.OrderItem;
import lombok.Builder;
import lombok.Getter;


@Getter
public class CartData {
    private String fileName;
    private Long foodId;
    private String foodName;
    private int foodPrice;
    private int count;

    public CartData() {
    }

    @Builder
    public CartData(String fileName, Long foodId, String foodName, int foodPrice, int count) {
        this.fileName = fileName;
        this.foodId = foodId;
        this.foodName = foodName;
        this.foodPrice = foodPrice;
        this.count = count;
    }

    public OrderItem toEntity(Food food, Order order){
        return OrderItem
                .builder()
                .food(food)
                .order(order)
                .orderPrice(foodPrice*count)
                .count(count)
                .build();
    }
}
