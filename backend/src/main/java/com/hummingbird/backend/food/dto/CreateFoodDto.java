package com.hummingbird.backend.food.dto;

import com.hummingbird.backend.category.domain.Category;
import com.hummingbird.backend.food.domain.Food;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CreateFoodDto {
    private String name;
    private int price;
    private String content;

    @Builder
    public CreateFoodDto(String name, int price, String content) {
        this.name = name;
        this.price = price;
        this.content = content;
    }

    public Food toEntity(Category category) {
        Food food = Food.builder()
                .name(name)
                .price(price)
                .content(content)
                .category(category)
                .build();
        return food;
    }
}
