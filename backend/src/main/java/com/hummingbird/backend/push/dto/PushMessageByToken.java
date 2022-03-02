package com.hummingbird.backend.push.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

@Getter
public class PushMessageByToken extends PushCommonMessage{

    @NonNull
    private String token;

    @Builder
    public PushMessageByToken(String title, String message, @NonNull String token) {
        super(title, message);
        this.token = token;
    }
}
