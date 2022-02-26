package com.hummingbird.backend.order.dto;

import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.order.domain.OrderItem;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
public class OrderItemInfoDto {

    private FoodInfoDto food;
    private int orderPrice;
    private int count;


    public OrderItem toEntity(Food food,Order order){
        return OrderItem
                .builder()
                .food(food)
                .order(order)
                .orderPrice(orderPrice)
                .count(count)
                .build();
    }
}
