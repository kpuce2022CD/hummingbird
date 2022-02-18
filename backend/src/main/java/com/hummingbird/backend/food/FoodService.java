package com.hummingbird.backend.food;

import com.hummingbird.backend.domain.Food;

import java.util.List;

public interface FoodService {
    Long submit(Food food); //등록
    boolean delete(Long id); //삭제
    Long update(Long id,String name,String describe, int price); //수정

//    int deleteFoodsByMenuId(Long menuId);
    int deleteFoodsByCategoryId(Long categoryId);
}
