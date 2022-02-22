package com.hummingbird.backend.category.service.serviceImpl;

import com.hummingbird.backend.category.dto.CategoryDto;
import com.hummingbird.backend.category.repository.CategoryRepository;
import com.hummingbird.backend.category.service.CategoryService;
import com.hummingbird.backend.category.domain.Category;
import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.food.repository.FoodRepository;
import com.hummingbird.backend.menu.domain.Menu;
import com.hummingbird.backend.menu.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    public final CategoryRepository categoryRepository;
    public final FoodRepository foodRepository;
    public final MenuRepository menuRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository, FoodRepository foodRepository, MenuRepository menuRepository) {
        this.categoryRepository = categoryRepository;
        this.foodRepository = foodRepository;
        this.menuRepository = menuRepository;
    }

    @Override
    public Long create(CategoryDto dto,Long menuId) {
        Category category = new Category();
        Optional<Menu> optionalMenu = menuRepository.findById(menuId);
        if (optionalMenu.isEmpty()) {
            return null;
        }
        Menu menu = optionalMenu.get();
        category.setName(dto.getName());
        category.setMenu(menu);
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
        foodRepository.deleteAll(foodList);
//
//        for (int i=0; i < foodList.size(); i++) {
//            System.out.println(i);
//            foodRepository.delete(foodList.get(i));
//        }
        Category category = optionalCategory.get();
        categoryRepository.delete(category);
        return true;
    }
}
