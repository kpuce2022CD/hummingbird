package com.hummingbird.backend.order.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class OrderItemStatusResponse {
    private String status;
    private Long itemId;
}
