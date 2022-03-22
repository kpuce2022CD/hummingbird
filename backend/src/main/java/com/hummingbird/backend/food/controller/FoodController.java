package com.hummingbird.backend.food.controller;

import com.hummingbird.backend.food.dto.CreateFoodDto;
import com.hummingbird.backend.food.dto.UpdateFoodDto;
import com.hummingbird.backend.food.dto.UploadFoodDto;
import com.hummingbird.backend.food.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@RestController
public class FoodController {

    private final FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @PostMapping("/food/new")
    public Long createFood(@RequestParam("files") MultipartFile files, CreateFoodDto createFoodDto, Long categoryId) {
//        Long fileId = foodService.upload(fileService.uploadFile(files));
        UploadFoodDto uploadFoodDto = foodService.upload(files);
//        dto.setFileId(fileId);

        return foodService.submit(uploadFoodDto,createFoodDto, categoryId);
    }
    @PostMapping("/food/update")
    public Long updateFood(Long id,UpdateFoodDto dto){
        return foodService.updateFood(id,dto);
    }

    @PostMapping("/food/imgupdate")
    public Long updateFoodImage(@RequestParam("files") MultipartFile files,Long id){
        UploadFoodDto uploadFoodDto = foodService.upload(files);
        return foodService.updateImage(id,uploadFoodDto);
    }



    @PostMapping("/food/delete")
    public boolean deleteFood(Long id) {
        return foodService.delete(id);
    }

//    @PostMapping("/food/menu")
//    public int getByMenu(Long id){
//        return foodService.getFoodByMenu(id).size();
//    }
}
