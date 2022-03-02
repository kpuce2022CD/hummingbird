package com.hummingbird.backend.order.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class OrderSearchCondition {

    private Long orderId;
    private Long customerId;
    private Long shopId;

    public boolean isSearchByCustomer() {
        return orderId == null
                && customerId != null
                && shopId == null;
    }

    public boolean isSearchByShop() {
        return orderId == null
                && customerId == null
                && shopId != null;
    }


}
