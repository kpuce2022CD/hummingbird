package com.hummingbird.backend.order.dto;

import com.hummingbird.backend.order.domain.OrderStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class OrderInfo {

    private Long orderId;

    private Long customerId;

    private OrderStatus orderStatus;

    private List<OrderItemInfo> orderItemList;

    private int totalPrice;

    private LocalDateTime orderDate;

    private ShopInfo shopInfo;
}
