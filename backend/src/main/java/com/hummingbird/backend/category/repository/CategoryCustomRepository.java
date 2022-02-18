package com.hummingbird.backend.category.repository;

import com.hummingbird.backend.category.domain.Category;

import java.util.Optional;

public interface CategoryCustomRepository {
    Optional<Category> findByName(String name);
    Boolean isPresent(String name);
}
