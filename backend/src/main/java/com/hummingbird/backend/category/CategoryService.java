package com.hummingbird.backend.category;

import com.hummingbird.backend.domain.Category;

import java.util.List;

public interface CategoryService {
    Long create(Category category);
    Long update(Long id,String name);
    boolean delete(Long id);


}
