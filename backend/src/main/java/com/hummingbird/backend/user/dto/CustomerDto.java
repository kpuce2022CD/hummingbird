package com.hummingbird.backend.user.dto;

import com.hummingbird.backend.user.domain.Customer;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CustomerDto {

    private Long id;

    @NotEmpty
    private String name;

    @NotEmpty
    private String token;


}
