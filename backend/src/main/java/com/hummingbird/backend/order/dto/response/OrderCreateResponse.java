package com.hummingbird.backend.order.dto.response;

import com.hummingbird.backend.order.domain.OrderStatus;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class OrderCreateResponse {

    private int tableNumber;

    private int totalPrice;

    private OrderStatus orderStatus;
}
