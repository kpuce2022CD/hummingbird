package com.hummingbird.backend.order.dto.response;

import com.hummingbird.backend.order.dto.OrderInfo;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class OrderBillResponse {

    private List<OrderInfo> orderInfoList;
}
