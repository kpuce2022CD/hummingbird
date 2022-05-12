package com.hummingbird.backend.order.dto;

import com.hummingbird.backend.order.domain.OrderStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = "orderId")
public class OrderInfo {

    private Long orderId;

    private OrderStatus orderStatus;

    private LocalDateTime orderDate;

    @Setter
    private List<OrderItemInfo> orderItemList;


    @Builder
    public OrderInfo(Long orderId, OrderStatus orderStatus, LocalDateTime orderDate) {
        this.orderId = orderId;
        this.orderStatus = orderStatus;
        this.orderDate = orderDate;
    }

}
