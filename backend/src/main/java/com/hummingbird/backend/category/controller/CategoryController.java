package com.hummingbird.backend.category.controller;

import com.hummingbird.backend.category.dto.CreateCategoryDto;
import com.hummingbird.backend.category.dto.GetCategoryDto;
import com.hummingbird.backend.category.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Long createCategory(@RequestBody CreateCategoryDto dto){
        //현재 페이지의 menuId 받아오기
        Long menuId = 1L; //임시값
        return categoryService.create(dto,menuId);
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
    public Long updateCategory(Long categoryId,String updateName){
        return categoryService.update(categoryId, updateName);
    }

    //delete
    @PostMapping("/category/delete")
    public boolean deleteCategory(Long categoryId) {
        return categoryService.delete(categoryId);
    }






}
