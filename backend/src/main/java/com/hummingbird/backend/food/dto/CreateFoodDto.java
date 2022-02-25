package com.hummingbird.backend.food.dto;

import com.hummingbird.backend.category.domain.Category;
import com.hummingbird.backend.food.domain.Food;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Setter
@Getter
public class CreateFoodDto {
    private String name;
    private int price;
    private String content;
    private Long fileId;

    public Food toEntity(Category category) {
        Food food = Food.builder()
                .name(name)
                .price(price)
                .content(content)
                .category(category)
                .fileId(fileId)
                .build();
        return food;
    }
}
