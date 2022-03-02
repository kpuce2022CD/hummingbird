package com.hummingbird.backend.food.dto;


import com.hummingbird.backend.food.domain.Food;
import lombok.*;

@Data
@NoArgsConstructor
public class GetFoodDto {
    private Long id;
    private String name;
    private int price;
    private String content;
    private String origFileName;
    private String fileName;
    private String filePath;

    @Builder
    public GetFoodDto(Long id, String name, int price, String content, String origFileName, String fileName, String filePath) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.content = content;
        this.origFileName = origFileName;
        this.fileName = fileName;
        this.filePath = filePath;
    }

}
