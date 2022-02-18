package com.hummingbird.backend.category.service;

import com.hummingbird.backend.category.domain.Category;

public interface CategoryService {
    Long create(Category category);
    Long update(Long id,String name);
    boolean delete(Long id);


}
