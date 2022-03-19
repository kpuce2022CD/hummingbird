package com.hummingbird.backend.food.controller;

import com.hummingbird.backend.food.dto.CreateFoodDto;
import com.hummingbird.backend.food.dto.GetFoodDto;
import com.hummingbird.backend.food.dto.UpdateFoodDto;
import com.hummingbird.backend.food.dto.UploadFoodDto;
import com.hummingbird.backend.food.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
    public Long createFood(@RequestParam("files") MultipartFile files, CreateFoodDto createFoodDto, Long categoryId) {
//        Long fileId = foodService.upload(fileService.uploadFile(files));
        UploadFoodDto uploadFoodDto = foodService.upload(files);
//        dto.setFileId(fileId);
        return foodService.submit(uploadFoodDto,createFoodDto, categoryId);
    }

    //read
//    @GetMapping("/food/get/one")
//    public GetFoodDto getFood(Long id){ //푸드 아이디로 푸드 가져오기
//        return null;
//    }

    @GetMapping("/food/get")
    public GetFoodDto getFood(Long id){ // 푸드 리스트 가져오기 (1 -> 카테고리, 2->메뉴, 타입 없으면 음식)
        return foodService.getFood(id);
    }

    @GetMapping("/food/get/category")
    public List<GetFoodDto> getFoodByCategory(Long id){
        return foodService.getFoodListByCategory(id);
    }

    @GetMapping("/food/get/menu")
    public List<GetFoodDto> getFoodByMenu(Long id){
        return foodService.getFoodListByMenu(id);
    }


    //update
    @PostMapping("/food/update")
    public Long updateFood(Long id,UpdateFoodDto dto){
        return foodService.updateFood(id,dto);
    }

    @PostMapping("/food/imgupdate")
    public Long updateFoodImage(@RequestParam("files") MultipartFile files,Long id){
        UploadFoodDto uploadFoodDto = foodService.upload(files);
        return foodService.updateImage(id,uploadFoodDto);
    }



    //delete
    @PostMapping("/food/delete")
    public boolean deleteFood(Long id) {
        return foodService.delete(id);
    }

//    @PostMapping("/food/menu")
//    public int getByMenu(Long id){
//        return foodService.getFoodByMenu(id).size();
//    }
}
