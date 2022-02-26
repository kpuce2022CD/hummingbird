package com.hummingbird.backend.shop.service.impl;

import com.hummingbird.backend.shop.domain.Shop;
import com.hummingbird.backend.shop.dto.ShopDto;
import com.hummingbird.backend.shop.repository.ShopRepository;
import com.hummingbird.backend.shop.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class GeneralShopService implements ShopService {


    private final ShopRepository shopRepository;

    @Autowired
    public GeneralShopService(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    @Override
    public Shop createShop(ShopDto shopDto) {
        return shopRepository.save(shopDto.toEntity());
    }

    @Override
    public Shop findShopById(Long shopId) {
       return shopRepository.findShopById(shopId).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public Shop getReferenceById(Long shopId) {
        return shopRepository.getById(shopId);
    }

    @Override
    public Shop updateShopInfo(ShopDto shopDto) {
        Shop shop = shopRepository.findShopById(shopDto.getId()).orElseThrow(EntityNotFoundException::new);
        shop.updateShopProfile(shopDto);
        return shop;
    }

    @Override
    public void deleteShopById(Long shopId) {
        shopRepository.deleteShopById(shopId);
    }
}
