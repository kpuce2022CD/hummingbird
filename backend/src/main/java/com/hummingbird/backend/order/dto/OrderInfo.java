package com.hummingbird.backend.order.dto;

import com.hummingbird.backend.order.domain.OrderStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@EqualsAndHashCode(of = "orderId")
public class OrderInfo {
    private Long customerId;

    private Long orderId;

    private OrderStatus orderStatus;

    private LocalDateTime orderDate;

    private String shopName;

    @Setter
    private List<OrderItemInfo> orderItemList;

    public OrderInfo(Long orderId, OrderStatus orderStatus, LocalDateTime orderDate, String shopName) {
        this.orderId = orderId;
        this.orderStatus = orderStatus;
        this.orderDate = orderDate;
        this.shopName = shopName;
    }

    public OrderInfo(Long orderId, OrderStatus orderStatus, LocalDateTime orderDate, Long customerId) {
        this.orderId = orderId;
        this.orderStatus = orderStatus;
        this.orderDate = orderDate;
        this.customerId = customerId;
    }

    public int calTotalPrice() {
        return orderItemList.stream().mapToInt(OrderItemInfo::calOrderPrice).sum();
    }
}
