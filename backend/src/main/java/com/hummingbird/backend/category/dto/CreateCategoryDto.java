package com.hummingbird.backend.category.dto;

import com.hummingbird.backend.category.domain.Category;
import com.hummingbird.backend.menu.domain.Menu;
import lombok.*;

@Data
@NoArgsConstructor
@Setter
@Getter
public class CreateCategoryDto {
    private String name;

    @Builder
    public CreateCategoryDto(String name) {
        this.name = name;
    }

    public Category toEntity(Menu menu){
        Category category = Category.builder()
                .name(name)
                .menu(menu)
                .build();
        return category;
    }
}
