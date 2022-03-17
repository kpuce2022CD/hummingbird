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

    @GetMapping(path="/food/get",params = "id")
    public List<GetFoodDto> getFoodList(
            @RequestParam(required = true) Long id,
            @RequestParam(required = false,defaultValue = "0") int type){ // 푸드 리스트 가져오기 (1 -> 카테고리, 2->메뉴, 타입 없으면 음식)

        switch (type){
            case 1:
                return foodService.getFoodListByCategory(id);
            case 2:
                return foodService.getFoodListByMenu(id);
            default:
                return foodService.getFood(id);
        }
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
