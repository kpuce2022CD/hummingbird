package com.hummingbird.backend.shop.repository;

import com.hummingbird.backend.shop.domain.Shop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShopRepository extends JpaRepository<Shop, Long> {
    Optional<Shop> findShopById(Long shopId);
    void deleteShopById(Long shopId);
}
