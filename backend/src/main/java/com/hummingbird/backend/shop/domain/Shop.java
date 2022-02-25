package com.hummingbird.backend.shop.domain;

import com.hummingbird.backend.shop.dto.ShopDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Shop {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @Enumerated(EnumType.STRING)
    private OpenStatus openStatus;

    public void updateShopProfile(ShopDto shopDto){
        this.email = shopDto.getEmail();
        this.openStatus = shopDto.getOpenStatus();
    }

    @Builder
    public Shop(Long id, String email, OpenStatus openStatus) {
        this.id = id;
        this.email = email;
        this.openStatus = openStatus;
    }
}
