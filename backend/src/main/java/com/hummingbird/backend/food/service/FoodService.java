package com.hummingbird.backend.food.service;

import com.hummingbird.backend.food.dto.CreateFoodDto;
import com.hummingbird.backend.food.dto.GetFoodDto;
import com.hummingbird.backend.food.dto.UpdateFoodDto;
import com.hummingbird.backend.food.dto.UploadFoodDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FoodService {
    Long submit(UploadFoodDto uploadFoodDto,CreateFoodDto createFoodDto, Long categoryId); //등록
    boolean delete(Long id); //삭제
    Long update(Long id, UpdateFoodDto dto); //수정
    UploadFoodDto upload(MultipartFile files);
    List<GetFoodDto> getFoodList();
    List<GetFoodDto> getFoodListByCategory(Long categoryId);



//    int deleteFoodsByMenuId(Long menuId);
//    int deleteFoodsByCategoryId(Long categoryId);
}
