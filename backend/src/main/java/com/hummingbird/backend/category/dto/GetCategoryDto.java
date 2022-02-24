package com.hummingbird.backend.category.dto;

import com.hummingbird.backend.menu.domain.Menu;
import lombok.Builder;

public class GetCategoryDto {
    private Long id;
    private Menu menu;
    private String name;

    @Builder
    public GetCategoryDto(Long id, Menu menu, String name) {
        this.id = id;
        this.menu = menu;
        this.name = name;
    }
}
