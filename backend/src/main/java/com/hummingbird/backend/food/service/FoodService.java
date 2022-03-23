package com.hummingbird.backend.food.service;

import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.food.dto.CreateFoodDto;
import com.hummingbird.backend.food.dto.GetFoodDto;
import com.hummingbird.backend.food.dto.UpdateFoodDto;
import com.hummingbird.backend.food.dto.UploadFoodDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface FoodService {
    Long submit(UploadFoodDto uploadFoodDto,CreateFoodDto dto, Long categoryId); //등록
    boolean delete(Long foodId); //삭제
    Long updateFood(Long foodId, UpdateFoodDto dto); //수정
    Long updateImage(Long foodId,UploadFoodDto dto); //이미지 업데이트
    UploadFoodDto upload(MultipartFile files) throws UnsupportedEncodingException, NoSuchAlgorithmException; //이미지 업로드
    List<GetFoodDto> getFoodListByMenu(Long menuId);
    List<GetFoodDto> getFoodListByCategory(Long categoryId);
    GetFoodDto getFood(Long foodId);
    Food getReferenceById(Long foodId);

//    int deleteFoodsByMenuId(Long menuId);
//    int deleteFoodsByCategoryId(Long categoryId);
}
