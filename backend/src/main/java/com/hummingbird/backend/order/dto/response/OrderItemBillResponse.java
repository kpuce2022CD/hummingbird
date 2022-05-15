package com.hummingbird.backend.order.dto.response;

import com.hummingbird.backend.order.domain.OrderItem;
import com.hummingbird.backend.order.dto.OrderItemBillInfo;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class OrderItemBillResponse {
    private Long orderId;
    private List<OrderItemBillInfo> orderItemList;
}
