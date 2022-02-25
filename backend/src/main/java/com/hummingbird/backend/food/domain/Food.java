package com.hummingbird.backend.food.domain;

import com.hummingbird.backend.category.domain.Category;
import com.hummingbird.backend.food.dto.UpdateFoodDto;
import com.hummingbird.backend.food.dto.UploadFoodDto;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@ToString
@Getter
@Entity
@NoArgsConstructor
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 20)
    private String name;

    @Column(name = "content",length = 100)
    private String content;

    @Column(name = "price")
    private int price;


    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "origFileName",nullable = false)
    private String origFileName;

    @Column(name = "file_name",nullable = false)
    private String fileName;

    @Column(name = "file_path",nullable = false)
    private String filePath;

    @Builder
    public Food(Long id, String name, String content, int price, Long fileId, Category category, String origFileName, String fileName, String filePath) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.price = price;
        this.category = category;
        this.origFileName = origFileName;
        this.fileName = fileName;
        this.filePath = filePath;
    }

    public void UploadImage(UploadFoodDto uploadFoodDto){
        this.origFileName = uploadFoodDto.getOrigFileName();
        this.fileName = uploadFoodDto.getFileName();
        this.filePath = uploadFoodDto.getFilePath();
    }


    public void UpdateFood(UpdateFoodDto dto){
        this.name = dto.getName();
        this.price = dto.getPrice();
        this.content = dto.getContent();
        this.origFileName = dto.getOrigFileName();
        this.fileName = dto.getFileName();
        this.filePath = dto.getFilePath();
    }
}
