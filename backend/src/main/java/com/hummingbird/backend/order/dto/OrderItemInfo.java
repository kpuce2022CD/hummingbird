package com.hummingbird.backend.order.dto;

import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.order.domain.OrderItem;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderItemInfo {

    private FoodInfo food;
    private int orderPrice;
    private int count;

}
