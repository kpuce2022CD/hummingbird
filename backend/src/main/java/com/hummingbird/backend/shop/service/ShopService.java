package com.hummingbird.backend.shop.service;

import com.hummingbird.backend.shop.domain.Shop;
import com.hummingbird.backend.shop.dto.ShopDto;

public interface ShopService {

    // 가게 생성
    Shop createShop(ShopDto shopDto);

    // 가게 조회
    Shop findShopById(Long shopId);

    // 가게 reference 조회
    Shop getReferenceById(Long shopId);

    // 가게 정보 업데이트
    Shop updateShopInfo(ShopDto shopDto);

    // 가게 삭제
    void deleteShopById(Long shopId);

}
