package com.hummingbird.backend.order.dto.response;

import com.hummingbird.backend.order.domain.OrderItem;
import com.hummingbird.backend.order.domain.OrderStatus;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class OrderCancelResponse {
    private Long orderId;
    private OrderStatus status;
}
