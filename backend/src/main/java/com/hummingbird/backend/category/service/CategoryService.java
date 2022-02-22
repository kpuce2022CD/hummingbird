package com.hummingbird.backend.category.service;

import com.hummingbird.backend.category.domain.Category;
import com.hummingbird.backend.category.dto.CategoryDto;

public interface CategoryService {
    Long create(CategoryDto category,Long menuId);
    Long update(Long id,String name);
    boolean delete(Long id);


}
