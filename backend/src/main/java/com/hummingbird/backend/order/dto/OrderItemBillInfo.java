package com.hummingbird.backend.order.dto;

import com.hummingbird.backend.order.domain.OrderItemStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class OrderItemBillInfo {
    private Long orderId;
    private String foodName;
    private int tableNum;
    private OrderItemStatus status;
    private LocalDateTime orderDate;
}
