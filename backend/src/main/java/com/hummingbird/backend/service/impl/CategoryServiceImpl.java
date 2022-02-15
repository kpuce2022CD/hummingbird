package com.hummingbird.backend.service.impl;

import com.hummingbird.backend.domain.Category;
import com.hummingbird.backend.repository.CategoryRepository;
import com.hummingbird.backend.repository.MenuRepository;
import com.hummingbird.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    public final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public boolean updateCategory(Long id, String name) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if(!optionalCategory.isPresent()){
            return false;
        }
        else{
            Category category = optionalCategory.get();
            category.setCategory_name(name);
            categoryRepository.save(category);
            return true;
        }
    }
}
