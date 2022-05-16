package com.hummingbird.backend.order.dto.request;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PayCancelRequest {
    private String imp_uid;
    private int amount;
    private String reason;
    private String refund_holder;
    private String refund_tel;
    private String refund_bank;
    private String ref_account;
}
