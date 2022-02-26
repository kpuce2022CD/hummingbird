package com.hummingbird.backend.order.dto.response;

import com.hummingbird.backend.order.domain.OrderStatus;
import com.hummingbird.backend.order.dto.OrderInfoDto;
import lombok.Builder;

@Builder
public class OrderCreateResponse {

    private int tableNumber;

    private int totalPrice;

    private OrderStatus orderStatus;
}
