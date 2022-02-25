package com.hummingbird.backend.food.controller;

import com.hummingbird.backend.file.dto.FileDto;
import com.hummingbird.backend.file.service.FileService;
import com.hummingbird.backend.food.dto.CreateFoodDto;
import com.hummingbird.backend.food.service.FoodService;
import com.hummingbird.backend.util.MD5Generator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@RestController
public class FoodController {

    private FoodService foodService;
    private FileService fileService;

    @Autowired
    public FoodController(FoodService foodService, FileService fileService) {
        this.foodService = foodService;
        this.fileService = fileService;
    }

    @PostMapping("/food/new")
    public Long createFood(@RequestParam("files") MultipartFile files, CreateFoodDto dto, Long categoryId) {
        try {
            String origFilename = files.getOriginalFilename();
            String filename = new MD5Generator(origFilename).toString();
            /* 실행되는 위치의 'files' 폴더에 파일이 저장됩니다. */
            String savePath = System.getProperty("user.dir") + "/files";
            /* 파일이 저장되는 폴더가 없으면 폴더를 생성합니다. */
            if (!new File(savePath).exists()) {
                try {
                    new File(savePath).mkdir();
                } catch (Exception e) {
                    e.getStackTrace();
                }
            }
            String filePath = savePath + "/" + filename;
            files.transferTo(new File(filePath));

            FileDto fileDto = new FileDto();
            fileDto.setOrigFilename(origFilename);
            fileDto.setFilename(filename);
            fileDto.setFilePath(filePath);

            Long fileId = fileService.saveFile(fileDto);
            dto.setFileId(fileId);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return foodService.submit(dto, categoryId);
    }
    @PostMapping("/food/update")
    public Long updateFood(Long id,String name, String describe, int price){
//        return foodService.update(id, name, describe, price);
        return null;
    }

    @PostMapping("/food/delete")
    public boolean deleteFood(Long id) {
        return foodService.delete(id);
    }

//    @PostMapping("/food/menu")
//    public int getByMenu(Long id){
//        return foodService.getFoodByMenu(id).size();
//    }
}
