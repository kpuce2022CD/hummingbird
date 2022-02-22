package com.hummingbird.backend.food.service;

import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.food.dto.FoodDto;

public interface FoodService {
    Long submit(FoodDto dto,Long categoryId); //등록
    boolean delete(Long id); //삭제
    Long update(Long id,String name,String describe, int price); //수정

//    int deleteFoodsByMenuId(Long menuId);
    int deleteFoodsByCategoryId(Long categoryId);
}
