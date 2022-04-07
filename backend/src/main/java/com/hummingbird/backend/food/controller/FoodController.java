package com.hummingbird.backend.food.controller;

import com.hummingbird.backend.food.dto.CreateFoodDto;
import com.hummingbird.backend.food.dto.GetFoodDto;
import com.hummingbird.backend.food.dto.UpdateFoodDto;
import com.hummingbird.backend.food.dto.UploadFoodDto;
import com.hummingbird.backend.food.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;


@RestController
public class FoodController {

    private FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    //create
    @PostMapping("/food/new")
    public Long createFood(@RequestPart("foodName") String foodName,
                           @RequestPart("foodPrice") String foodPrice,
                           @RequestPart("foodContent") String foodContent,
                           @RequestPart(value = "file", required = false) MultipartFile file,
                           @RequestPart("categoryId") String categoryId) throws UnsupportedEncodingException, NoSuchAlgorithmException {
//        Long fileId = foodService.upload(fileService.uploadFile(files));
        CreateFoodDto foodDto = CreateFoodDto.builder()
                .name(foodName)
                .price(Integer.parseInt(foodPrice))
                .content(foodContent)
                .build();
        UploadFoodDto uploadFoodDto = null;
        if(!file.isEmpty()){
            uploadFoodDto = foodService.upload(file);
        }
//        dto.setFileId(fileId);
        return foodService.submit(uploadFoodDto,foodDto, Long.parseLong(categoryId));
    }

    //read
//    @GetMapping("/food/get/one")
//    public GetFoodDto getFood(Long id){ //푸드 아이디로 푸드 가져오기
//        return null;
//    }

    @GetMapping("/food/get")
    public GetFoodDto getFood(Long foodId){ // 푸드 아이디로 푸드 가져오기
        return foodService.getFood(foodId);
    }

    @GetMapping("/food/get/category")
    public List<GetFoodDto> getFoodByCategory(Long categoryId){ //카테고리 아이디로 푸드 가져오기
        return foodService.getFoodListByCategory(categoryId);
    }

    @GetMapping("/food/get/menu")
    public List<GetFoodDto> getFoodByMenu(Long menuId){ //메뉴 아이디로 푸드 가져오기
        return foodService.getFoodListByMenu(menuId);
    }


    //update
//    @PostMapping("/food/update")
//    public Long updateFood(@RequestParam("foodId") Long foodId,
//                           @RequestBody UpdateFoodDto dto){
//        return foodService.updateFood(foodId,dto);
//    }

    @PostMapping("/food/update")
    public Long updateFood(@RequestBody HashMap<String, Object> data) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        UpdateFoodDto foodDto = UpdateFoodDto.builder()
                .name((String) data.get("foodName"))
                .price(Integer.parseInt((String) data.get("foodPrice")))
                .content((String) data.get("foodContent"))
                .build();
//        dto.setFileId(fileId);
        return foodService.updateFood( Long.parseLong((String)data.get("foodId")), foodDto);
    }


    @PostMapping("/food/update/img")
    public Long updateFoodImage(@RequestParam("files") MultipartFile files,Long foodId) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        UploadFoodDto uploadFoodDto = foodService.upload(files);
        return foodService.updateImage(foodId,uploadFoodDto);
    }



    //delete
    @PostMapping("/food/delete")
    public boolean deleteFood(Long foodId) {
        return foodService.delete(foodId);
    }

//    @PostMapping("/food/menu")
//    public int getByMenu(Long id){
//        return foodService.getFoodByMenu(id).size();
//    }
}
