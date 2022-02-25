package com.hummingbird.backend.shop.domain;

import com.hummingbird.backend.shop.dto.ShopDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Shop {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;

    public void updateShopProfile(ShopDto shopDto){
        this.email = shopDto.getEmail();
        this.password = shopDto.getPassword();
    }

    @Builder
    public Shop(Long id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
}
