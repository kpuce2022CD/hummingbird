package com.hummingbird.backend.category.service;

import com.hummingbird.backend.category.dto.CreateCategoryDto;
import com.hummingbird.backend.category.dto.GetCategoryDto;

import java.util.List;

public interface CategoryService {
    //create
    Long create(CreateCategoryDto dto, Long menuId);

    //read
    GetCategoryDto getCategory(Long categoryId);
    List<GetCategoryDto> getCategoryListByMenu(Long menuId);

    //update
    Long update(Long categoryId,String categoryName);

    //delete
    boolean delete(Long id);


}
