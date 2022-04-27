package com.hummingbird.backend.category.controller;

import com.google.protobuf.Any;
import com.hummingbird.backend.category.dto.CreateCategoryDto;
import com.hummingbird.backend.category.dto.GetCategoryDto;
import com.hummingbird.backend.category.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@RestController
public class CategoryController {
    private CategoryService categoryService;


    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }


    //create
    @PostMapping("/category/new")
    public Long createCategory(@RequestBody HashMap<String, Object> data){ //string으로 받아서 Long 형변환
        CreateCategoryDto dto = CreateCategoryDto.builder()
                .name((String) data.get("categoryName"))
                .build();
        return categoryService.create(dto,Long.parseLong((String) data.get("menuId")));
    }

    //read
    @GetMapping("/category/get")
    public GetCategoryDto getCategory(Long categoryId){
        return categoryService.getCategory(categoryId);
    }

    @GetMapping("/category/get/menu")
    public List<GetCategoryDto> getCategoryByMenu(Long menuId){
        return categoryService.getCategoryListByMenu(menuId);
    }

    //update
    @PostMapping("/category/update")
    public Long updateCategory(@RequestBody HashMap<String, Object> data){ //string 으로 받아서 Long 형변환
        return categoryService.update(Long.parseLong((String)data.get("categoryId")), (String)data.get("categoryName"));
    }

    //delete
    @PostMapping("/category/delete")
    public boolean deleteCategory(Long categoryId) {
        return categoryService.delete(categoryId);
    }




}
