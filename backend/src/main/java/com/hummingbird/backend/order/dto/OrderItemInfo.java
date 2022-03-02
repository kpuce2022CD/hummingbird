package com.hummingbird.backend.order.dto;

import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.order.domain.OrderItem;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderItemInfo {

    private String foodName;
    private int foodPrice;
    private int orderPrice;
    private int count;

    public int calOrderPrice() {
        return foodPrice * count;
    }

    public OrderItemInfo(String foodName, int foodPrice, int orderPrice, int count) {
        this.foodName = foodName;
        this.foodPrice = foodPrice;
        this.orderPrice = orderPrice;
        this.count = count;
    }
}
