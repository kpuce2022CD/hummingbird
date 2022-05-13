package com.hummingbird.backend.order.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class OrderItemBillInfo {
    private String foodName;
    private int tableNum;
    private String status;
    private LocalDateTime orderDate;
}
