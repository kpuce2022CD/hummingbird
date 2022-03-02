package com.hummingbird.backend.order.dto.request;

import com.hummingbird.backend.order.domain.OrderStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class OrderCreateDto {

    private Long customerId;

    private Long shopId;

    private List<OrderItemCreateDto> orderItemList;

}
