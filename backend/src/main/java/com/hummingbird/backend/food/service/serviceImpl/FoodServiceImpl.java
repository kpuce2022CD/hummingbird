package com.hummingbird.backend.food.service.serviceImpl;

import com.hummingbird.backend.category.domain.Category;
import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.food.dto.CreateFoodDto;
import com.hummingbird.backend.category.repository.CategoryRepository;
import com.hummingbird.backend.food.dto.GetFoodDto;
import com.hummingbird.backend.food.dto.UpdateFoodDto;
import com.hummingbird.backend.food.repository.FoodRepository;
import com.hummingbird.backend.food.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FoodServiceImpl implements FoodService {
    public final FoodRepository foodRepository;
    public final CategoryRepository categoryRepository;

    @Autowired
    public FoodServiceImpl(FoodRepository foodRepository, CategoryRepository categoryRepository) {
        this.foodRepository = foodRepository;
        this.categoryRepository = categoryRepository;
    }


    @Override
    public Long submit(CreateFoodDto dto, Long categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isEmpty()) {
            return null;
        }
        Food food = dto.toEntity(optionalCategory.get());


        return foodRepository.save(food).getId();
    }

    @Override
    public boolean delete(Long id) {
        Optional<Food> optionalFood = foodRepository.findById(id);
        if(optionalFood.isEmpty()){
            return false;
        }
        foodRepository.delete(optionalFood.get());
        return true;
    }

    @Override
    public Long update(Long id, UpdateFoodDto dto) {
        Optional<Food> optionalFood = foodRepository.findById(id);
        Food food = optionalFood.get();
        food.UpdateFood(dto);
        return foodRepository.save(food).getId();
    }

    @Override
    public List<GetFoodDto> getFoodList() {
        List<Food> foodList = foodRepository.findAll();
        List<GetFoodDto> dtoList = new ArrayList<>();
        for (Food food : foodList) {
            GetFoodDto dto = GetFoodDto.builder()
                    .name(food.getName())
                    .id(food.getId())
                    .price(food.getPrice())
                    .content(food.getContent())
                    .build();
            dtoList.add(dto);
        }

        return dtoList;
    }

    @Override
    public List<GetFoodDto> getFoodListByCategory(Long categoryId) {
        List<Food> foodList = foodRepository.findByCategory_Id(categoryId);
        List<GetFoodDto> dtoList = new ArrayList<>();
        for (Food food : foodList) {
            GetFoodDto dto = GetFoodDto.builder()
                    .name(food.getName())
                    .id(food.getId())
                    .price(food.getPrice())
                    .content(food.getContent())
                    .build();
            dtoList.add(dto);
        }
        return dtoList;
    }

}
