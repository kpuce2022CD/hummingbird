package com.hummingbird.backend.category;

import com.hummingbird.backend.domain.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryCustomRepository {
    Optional<Category> findByName(String name);
    Boolean isPresent(String name);
}
