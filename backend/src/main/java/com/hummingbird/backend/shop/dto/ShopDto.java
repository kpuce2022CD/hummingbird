package com.hummingbird.backend.shop.dto;

import com.hummingbird.backend.shop.domain.Shop;
import lombok.Getter;

@Getter
public class ShopDto {
    private Long id;
    private String email;
    private String password;

    public Shop toEntity(){
        return Shop
                .builder()
                .id(this.id)
                .email(this.email)
                .password(this.password)
                .build();
    }
}
