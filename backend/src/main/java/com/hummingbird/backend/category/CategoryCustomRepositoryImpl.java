package com.hummingbird.backend.category;

import com.hummingbird.backend.domain.Category;

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
