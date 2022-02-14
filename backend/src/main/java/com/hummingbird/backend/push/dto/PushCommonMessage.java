package com.hummingbird.backend.push.dto;

import lombok.Builder;
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

    public final static PushCommonMessage REQUEST_ORDER = PushCommonMessage.builder().title("주문 요청").message("새로운 주문이 요청 발생.").build();
    public final static PushCommonMessage ACCEPT_ORDER = PushCommonMessage.builder().title("주문 수락").message("주문이 요청 수락.").build();

    @Builder
    public PushCommonMessage(String title, String message) {
        this.title = title;
        this.message = message;
        this.createdMessageTime = LocalDateTime.now();
    }
}
