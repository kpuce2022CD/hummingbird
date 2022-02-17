package com.hummingbird.backend.controller;

import com.hummingbird.backend.domain.Category;
import com.hummingbird.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryController {
    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/category/new")
    public Long createCategory(@RequestBody Category category){
        return categoryService.create(category);
    }

    @PostMapping("/category/update")
    public Long updateCategory(Long id,String name){
        return categoryService.update(id, name);
    }

    @PostMapping("/category/delete")
    public boolean deleteCategory(Long id) {
        return categoryService.delete(id);
    }
}
