package com.hummingbird.backend.service.impl;

import com.hummingbird.backend.domain.Category;
import com.hummingbird.backend.domain.Food;
import com.hummingbird.backend.domain.Menu;
import com.hummingbird.backend.repository.CategoryRepository;
import com.hummingbird.backend.repository.FoodRepository;
import com.hummingbird.backend.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<Food> getFoodByMenu(Long menuId){
        List<Food> foodList = null;
        List<Category> categoryList = categoryRepository.findByMenu_Id(menuId);
        for (int i=0;i<categoryList.size();i++){
            foodList.addAll(foodRepository.findByCategory_Id(categoryList.get(i).getId()));
        }
//        List<Food> foodList = foodRepository.findByMenu_Id(menuId);
//        System.out.println(foodList.size());
        return foodList;
    }

    @Override
    public Long submit(Food food) {
        Category category = new Category();
        Menu menu = new Menu();
        category.setId(1L);
        menu.setId(3L);
        food.setCategory(category);
//        food.setMenu(menu);
        Food result = foodRepository.save(food);
        return result.getId();
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
    public Long update(Long id, String name, String describe, int price) {
        Optional<Food> optionalFood = foodRepository.findById(id);
        if (optionalFood.isEmpty()) {
            return null;
        }
        Food food = optionalFood.get();
        food.setName(name);
        food.setContent(describe);
        food.setPrice(price);
        return food.getId();
    }

//    @Override
//    public int deleteFoodsByMenuId(Long menuId) {
//        List<Food> foodList = foodRepository.findByMenu_Id(menuId);
//        int i;
//        for (i=0; i < foodList.size(); i++) {
//            foodRepository.delete(foodList.get(i));
//        }
//        return i;
//    }

    @Override
    public int deleteFoodsByCategoryId(Long categoryId) {
        List<Food> foodList = foodRepository.findByCategory_Id(categoryId);
        int i;
        for (i=0; i < foodList.size(); i++) {
            foodRepository.delete(foodList.get(i));
        }
        return i;
    }


}
