package com.hummingbird.backend.api;

import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.RequestFieldsSnippet;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;

public class CustomerDocumentation {

    public static RequestFieldsSnippet getCustomerFieldInfo(){
        return requestFields(
                fieldWithPath("name").type(JsonFieldType.STRING)
                        .description("customer 이름"),
                fieldWithPath("token").type(JsonFieldType.STRING)
                        .description("아직은 토큰 미발행 auth 추가 시 사용 예정 현재는 아무 값이나 들어 가도 됨"),
                fieldWithPath("email").type(JsonFieldType.STRING)
                        .description("로그인 할 이메일"),
                fieldWithPath("password").type(JsonFieldType.STRING)
                        .description("(하나 이상의 숫자, 대소 문자, 특수 문자) 8 이상 32 이하의 비밀 번호")
                );
    }
}
