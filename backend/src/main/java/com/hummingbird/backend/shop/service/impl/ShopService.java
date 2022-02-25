package com.hummingbird.backend.shop.service.impl;

import com.hummingbird.backend.shop.domain.Shop;
import com.hummingbird.backend.shop.dto.ShopDto;

public interface ShopService {

    // 가게 생성
    Shop createShop(ShopDto shopDto);

    Shop findShopById(Long shopId);

    // 가게 정보 업데이트
    Shop updateShopInfo(ShopDto shopDto);

    // 가게 삭제
    void deleteShopById(Long shopId);


}
