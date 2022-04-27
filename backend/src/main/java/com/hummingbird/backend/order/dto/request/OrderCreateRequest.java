package com.hummingbird.backend.order.dto.request;

import com.hummingbird.backend.order.dto.CartData;
import lombok.Getter;

import java.util.List;

@Getter
public class OrderCreateRequest {
    // 향후 변경을 위한 wrapping class
    private int tableNumber;
    private String impUid;
    private Long ownerId;
    private List<CartData> cartDataList;
}
