package com.hummingbird.backend.order.dto.request;

import lombok.Getter;

@Getter
public class OrderCreateRequest {
    // 향후 변경을 위한 wrapping class
    private int tableNumber;

    private OrderCreateDto orderInfoDto;
}
