package com.hummingbird.backend.category.dto;

import com.hummingbird.backend.menu.domain.Menu;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Setter
@Getter
public class CategoryDto {
    private Long id;
    private String name;
}
