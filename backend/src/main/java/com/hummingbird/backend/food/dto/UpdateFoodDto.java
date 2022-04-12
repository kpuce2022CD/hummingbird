package com.hummingbird.backend.food.dto;

import lombok.*;

@Data
public class UpdateFoodDto {
    private String name;
    private int price;
    private String content;

    @Builder
    public UpdateFoodDto(String name, int price, String content) {
        this.name = name;
        this.price = price;
        this.content = content;
    }
}
