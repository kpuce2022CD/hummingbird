package com.hummingbird.backend.order.dto.response;

import com.hummingbird.backend.order.domain.OrderItemStatus;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class OrderItemStatusResponse {
    private OrderItemStatus status;
    private Long itemId;
}
