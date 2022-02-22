package com.hummingbird.backend.food.controller;

import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.food.dto.FoodDto;
import com.hummingbird.backend.food.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FoodController {

    private FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @PostMapping("/food/new")
    public Long createFood(@RequestBody FoodDto dto, Long categoryId){
        return foodService.submit(dto,categoryId);
    }

    @PostMapping("/food/update")
    public Long updateFood(Long id,String name, String describe, int price){
        return foodService.update(id, name, describe, price);
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
