package com.hummingbird.backend.food.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class UploadFoodDto {
    private String origFileName;
    private String fileName;
    private String filePath;

    @Builder
    public UploadFoodDto(String origFileName, String fileName, String filePath) {
        this.origFileName = origFileName;
        this.fileName = fileName;
        this.filePath = filePath;
    }
}
