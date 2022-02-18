package com.hummingbird.backend.food.service;

import com.hummingbird.backend.food.domain.Food;

public interface FoodService {
    Long submit(Food food); //등록
    boolean delete(Long id); //삭제
    Long update(Long id,String name,String describe, int price); //수정

//    int deleteFoodsByMenuId(Long menuId);
    int deleteFoodsByCategoryId(Long categoryId);
}
