package com.hummingbird.backend.food.service;

import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.food.dto.CreateFoodDto;
import com.hummingbird.backend.food.dto.GetFoodDto;
import com.hummingbird.backend.food.dto.UpdateFoodDto;

import java.util.List;

public interface FoodService {
    Long submit(CreateFoodDto dto, Long categoryId); //등록
    boolean delete(Long id); //삭제
    Long update(Long id, UpdateFoodDto dto); //수정
    List<GetFoodDto> getFoodList();
    List<GetFoodDto> getFoodListByCategory(Long categoryId);

    Food findFoodById(Long foodId);

    Food getReferenceById(Long foodId);

//    int deleteFoodsByMenuId(Long menuId);
//    int deleteFoodsByCategoryId(Long categoryId);
}
