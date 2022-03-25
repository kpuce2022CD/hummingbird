package com.hummingbird.backend.category.dto;

import com.hummingbird.backend.menu.domain.Menu;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class GetCategoryDto {
    private Long id;
    private String name;

    @Builder
    public GetCategoryDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
