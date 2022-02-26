package com.hummingbird.backend.order.dto;

import com.hummingbird.backend.order.domain.OrderStatus;
import com.hummingbird.backend.order.dto.request.OrderItemCreateDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class OrderInfoDto {

    private Long orderId;

    private Long customerId;

    private OrderStatus orderStatus;

    private List<OrderItemInfoDto> orderItemList;

    private int totalPrice;

    private LocalDateTime orderDate;

    private ShopInfoDto shopInfo;
}
