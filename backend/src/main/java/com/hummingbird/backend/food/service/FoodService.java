package com.hummingbird.backend.food.service;

import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.food.dto.CreateFoodDto;
import com.hummingbird.backend.food.dto.GetFoodDto;
import com.hummingbird.backend.food.dto.UpdateFoodDto;
import com.hummingbird.backend.food.dto.UploadFoodDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FoodService {
    Long submit(UploadFoodDto uploadFoodDto,CreateFoodDto createFoodDto, Long categoryId); //등록
    boolean delete(Long id); //삭제
    Long updateFood(Long id, UpdateFoodDto dto); //수정
    Long updateImage(Long id,UploadFoodDto dto); //이미지 업데이트
    UploadFoodDto upload(MultipartFile files); //이미지 업로드
    List<GetFoodDto> getFoodListByMenu(Long id);
    List<GetFoodDto> getFoodListByCategory(Long id);
    List<GetFoodDto> getFood(Long id);
    Food getReferenceById(Long foodId);

//    int deleteFoodsByMenuId(Long menuId);
//    int deleteFoodsByCategoryId(Long categoryId);
}
