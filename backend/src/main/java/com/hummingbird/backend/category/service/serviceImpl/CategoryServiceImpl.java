package com.hummingbird.backend.category.service.serviceImpl;

import com.hummingbird.backend.category.dto.CreateCategoryDto;
import com.hummingbird.backend.category.dto.GetCategoryDto;
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
    public Long create(CreateCategoryDto dto, Long menuId) {
//        Category category = new Category();
        Optional<Menu> optionalMenu = menuRepository.findById(menuId);

        if (optionalMenu.isEmpty()) {
            return null;
        }
        Category category = dto.toEntity(optionalMenu.get());
//        Menu menu = optionalMenu.get();
//        category.setName(dto.getName());
//        category.setMenu(menu);
//        Category result = categoryRepository.save(category);
//        return result.getId();
        return categoryRepository.save(category).getId();
    }

    @Override
    public Long update(Long id, String name) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if(optionalCategory.isEmpty()){
            return null;
        }
        Category category = optionalCategory.get();
        category.changeName(name);
        return categoryRepository.save(category).getId();
//        else{
//            Category category = optionalCategory.get();
//            category.setName(name);
//            categoryRepository.save(category);
//            return category.getId();
//        }
    }

    @Override
    public GetCategoryDto getCategory(Long categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isEmpty()) {
            return null;
        }
        Category category = optionalCategory.get();
        GetCategoryDto dto = GetCategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .menu(category.getMenu())
                .build();
        return dto;
    }

    @Override
    public List<GetCategoryDto> getCategoryListByMenu(Long menuId) {
        Optional<Menu> optionalMenu = menuRepository.findById(menuId);
        List<GetCategoryDto> dtoList = null;
        if (optionalMenu.isEmpty()) {
            return null;
        }
//        Menu menu = optionalMenu.get();
        List<Category> categoryList = categoryRepository.findByMenu_Id(menuId);
        for (Category category : categoryList) {
            GetCategoryDto dto = GetCategoryDto.builder()
                    .name(category.getName())
                    .id(category.getId())
                    .menu(category.getMenu())
                    .build();
            dtoList.add(dto);
        }
        return dtoList;
    }

    @Override
    public List<GetCategoryDto> getCategoryList() {
        List<Category> categoryList = categoryRepository.findAll();
        List<GetCategoryDto> dtoList = null;
        for (Category category : categoryList) {
            GetCategoryDto dto = GetCategoryDto.builder()
                    .menu(category.getMenu())
                    .id(category.getId())
                    .name(category.getName())
                    .build();
            dtoList.add(dto);
        }
        return dtoList;
    }

    @Override
    public boolean delete(Long id) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isEmpty()) {
            return false;
        }
        Category category = optionalCategory.get();
        categoryRepository.delete(category);
        return true;
    }
}
