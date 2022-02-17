package com.hummingbird.backend.repository.impl;

import com.hummingbird.backend.domain.Category;
import com.hummingbird.backend.repository.CategoryCustomRepository;
import com.hummingbird.backend.repository.FoodRepository;

import java.util.Optional;

public class CategoryCustomRepositoryImpl implements CategoryCustomRepository {
    @Override
    public Optional<Category> findByName(String name) {
        return Optional.empty();
    }

    @Override
    public Boolean isPresent(String name) {
        return null;
    }


}
