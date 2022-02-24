package com.hummingbird.backend.category.service;

import com.hummingbird.backend.category.dto.CreateCategoryDto;
import com.hummingbird.backend.category.dto.GetCategoryDto;

import java.util.List;

public interface CategoryService {
    Long create(CreateCategoryDto category, Long menuId);
    Long update(Long id,String name);
    GetCategoryDto getCategory(Long categoryId);
    List<GetCategoryDto> getCategoryListByMenu(Long menuId);
    List<GetCategoryDto> getCategoryList();
    boolean delete(Long id);


}
