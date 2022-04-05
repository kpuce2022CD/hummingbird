package com.hummingbird.backend.shop.domain;

import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.shop.dto.ShopDto;
import com.hummingbird.backend.user.domain.Owner;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Shop {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shop_id")
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private OpenStatus openStatus;

    @OneToOne(mappedBy = "shop", fetch = LAZY)
    private Order order;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "owner_id")
    private Owner Owner;

    public void updateShopProfile(ShopDto shopDto){
        this.name = shopDto.getName();
        this.openStatus = shopDto.getOpenStatus();
    }

    @Builder
    public Shop(Long id, String name, OpenStatus openStatus) {
        this.id = id;
        this.name = name;
        this.openStatus = openStatus;
    }
}
