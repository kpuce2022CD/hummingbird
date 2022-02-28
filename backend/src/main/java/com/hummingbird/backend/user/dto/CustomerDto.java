package com.hummingbird.backend.user.dto;

import com.hummingbird.backend.user.domain.Customer;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CustomerDto {

    @NotEmpty
    private String name;

    @NotEmpty
    private String token;

    public CustomerDto(String name) {
        this.name = name;
        this.token = name+"token";
    }

    public Customer toEntity() {
        return new Customer(this.name);
    }
}
