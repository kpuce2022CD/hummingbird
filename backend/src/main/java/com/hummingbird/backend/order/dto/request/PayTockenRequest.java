package com.hummingbird.backend.order.dto.request;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PayTockenRequest {
    private String imp_key;
    private String imp_secret;
}
