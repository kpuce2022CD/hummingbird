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

import java.util.ArrayList;
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

    //create
    @Override
    public Long create(CreateCategoryDto dto, Long menuId) {
//        Category category = new Category();
        Menu menu = menuRepository.findById(menuId).orElseThrow();
        Category category = dto.toEntity(menu);
//        Menu menu = optionalMenu.get();
//        category.setName(dto.getName());
//        category.setMenu(menu);
//        Category result = categoryRepository.save(category);
//        return result.getId();
        return categoryRepository.save(category).getId();
    }



    //read
    @Override
    public GetCategoryDto getCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow();
       return category.converToGetCategoryDto();
    }

    @Override
    public List<GetCategoryDto> getCategoryListByMenu(Long menuId) {
        Menu menu= menuRepository.findById(menuId).orElseThrow();
        List<GetCategoryDto> dtoList = new ArrayList<>();
        List<Category> categoryList = categoryRepository.findByMenu_Id(menu.getId());
        for (Category category : categoryList) {
            GetCategoryDto dto = category.converToGetCategoryDto();
            dtoList.add(dto);
        }
        return dtoList;
    }

    //update
    @Override
    public Long update(Long categoryId, String categoryName) {
        Category category= categoryRepository.findById(categoryId).orElseThrow();
        category.changeName(categoryName);
        return categoryRepository.save(category).getId();
    }

    //delete
    @Override
    public boolean delete(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow();
        categoryRepository.delete(category);
        return true;
    }

    //    @Override
//    public List<GetCategoryDto> getCategoryList() {
//        List<Category> categoryList = categoryRepository.findAll();
//        List<GetCategoryDto> dtoList = null;
//        for (Category category : categoryList) {
//            GetCategoryDto dto = GetCategoryDto.builder()
//                    .menu(category.getMenu())
//                    .id(category.getId())
//                    .name(category.getName())
//                    .build();
//            dtoList.add(dto);
//        }
//        return dtoList;
//    }

}
