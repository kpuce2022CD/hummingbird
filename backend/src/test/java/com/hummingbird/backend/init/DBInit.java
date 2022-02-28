package com.hummingbird.backend.init;

import com.hummingbird.backend.user.domain.Customer;
import com.hummingbird.backend.user.dto.CustomerDto;

public class DBInit {


    public static final Customer CUSTOMER_1 = Customer
            .builder()
            .name("기현1")
            .token("기현1token")
            .email("qwer1231@naver.com")
            .password("zxcv1234~")
            .build();

    public static final Customer CUSTOMER_2 = Customer
            .builder()
            .name("기현2")
            .token("기현2token")
            .email("qwer1232@naver.com")
            .password("zxcv1234~")
            .build();

    public static final CustomerDto Customer_REQUEST_DTO = CustomerDto
            .builder()
            .name("기현1")
            .token("기현1token")
            .email("qwer1231@naver.com")
            .password("zxcv1234~")
            .build();

    public static final CustomerDto Customer_DTO_2 = CustomerDto
            .builder()
            .name("기현2")
            .token("기현2token")
            .email("qwer1232@naver.com")
            .password("zxcv1234~")
            .build();

}
