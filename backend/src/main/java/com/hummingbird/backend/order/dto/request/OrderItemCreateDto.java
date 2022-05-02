package com.hummingbird.backend.order.dto.request;

import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.order.domain.OrderItem;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OrderItemCreateDto {

    private Long foodId;
    private int foodPrice;
    private int count;


    public OrderItem toEntity(Food food,Order order){
        return OrderItem
                .builder()
                .food(food)
                .order(order)
                .foodPrice(foodPrice)
                .count(count)
                .build();
    }
}
