package com.hummingbird.backend.food.dto;


import com.hummingbird.backend.food.domain.Food;
import lombok.*;

@Data
@NoArgsConstructor
@Setter
@Getter
public class GetFoodDto {
    private Long id;
    private String name;
    private int price;
    private String content;
    private Long fileId;

    @Builder
    public GetFoodDto(Long id, String name, int price, String content, Long fileId) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.content = content;
        this.fileId = fileId;
    }


}
