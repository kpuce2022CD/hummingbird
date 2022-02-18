package com.hummingbird.backend.push.dto;

import lombok.Getter;
import lombok.NonNull;

import java.time.LocalDateTime;

@Getter
public class PushCommonMessage {

    @NonNull
    private String title;

    @NonNull
    private String message;

    private LocalDateTime createdMessageTime;
//    private String image;

    public static final PushCommonMessage REQUEST_ORDER = new PushCommonMessage("주문 요청", "새로운 주문이 요청 발생.");
    public static final PushCommonMessage ACCEPT_ORDER = new PushCommonMessage("주문 수락", "주문이 요청 수락.");
    public static final PushCommonMessage CANCEL_ORDER = new PushCommonMessage("주문 취소", "주문이 요청 취소.");


    public PushCommonMessage(String title, String message) {
        this.title = title;
        this.message = message;
        this.createdMessageTime = LocalDateTime.now();
    }
}
