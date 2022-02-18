package com.hummingbird.backend.category.service.serviceImpl;

import com.hummingbird.backend.category.repository.CategoryRepository;
import com.hummingbird.backend.category.service.CategoryService;
import com.hummingbird.backend.category.domain.Category;
import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.food.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    public final CategoryRepository categoryRepository;
    public final FoodRepository foodRepository;


    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, FoodRepository foodRepository) {
        this.categoryRepository = categoryRepository;
        this.foodRepository = foodRepository;
    }

    @Override
    public Long create(Category category) {
        Category result = categoryRepository.save(category);
        return result.getId();
    }

    @Override
    public Long update(Long id, String name) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if(!optionalCategory.isPresent()){
            return null;
        }
        else{
            Category category = optionalCategory.get();
            category.setName(name);
            categoryRepository.save(category);
            return category.getId();
        }
    }

    @Override
    public boolean delete(Long id) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isEmpty()) {
            return false;
        }
        List<Food> foodList = foodRepository.findByCategory_Id(id);

        for (int i=0; i < foodList.size(); i++) {
            System.out.println(i);
            foodRepository.delete(foodList.get(i));
        }
        Category category = optionalCategory.get();
        categoryRepository.delete(category);
        return true;
    }
}
