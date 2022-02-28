package com.hummingbird.backend.shop.dto;

import com.hummingbird.backend.shop.domain.OpenStatus;
import com.hummingbird.backend.shop.domain.Shop;
import lombok.Getter;

@Getter
public class ShopDto {
    private Long id;
    private String name;
    private OpenStatus openStatus;

    public Shop toEntity(){
        return Shop
                .builder()
                .id(this.id)
                .name(this.name)
                .openStatus(this.openStatus)
                .build();
    }
}
