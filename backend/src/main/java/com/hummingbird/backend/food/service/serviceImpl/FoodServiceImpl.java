package com.hummingbird.backend.food.service.serviceImpl;

import com.hummingbird.backend.category.domain.Category;
import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.food.dto.CreateFoodDto;
import com.hummingbird.backend.category.repository.CategoryRepository;
import com.hummingbird.backend.food.dto.GetFoodDto;
import com.hummingbird.backend.food.dto.UpdateFoodDto;
import com.hummingbird.backend.food.dto.UploadFoodDto;
import com.hummingbird.backend.food.repository.FoodRepository;
import com.hummingbird.backend.food.service.FoodService;
import com.hummingbird.backend.util.MD5Generator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FoodServiceImpl implements FoodService {
    public final FoodRepository foodRepository;
    public final CategoryRepository categoryRepository;

    @Autowired
    public FoodServiceImpl(FoodRepository foodRepository, CategoryRepository categoryRepository) {
        this.foodRepository = foodRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public UploadFoodDto upload(MultipartFile files){
        UploadFoodDto uploadFoodDto = new UploadFoodDto();
        try {
            String origName = files.getOriginalFilename();
            String name = new MD5Generator(origName).toString();
            String savePath = System.getProperty("user.dir") + "/files";
            /* 파일이 저장되는 폴더가 없으면 폴더를 생성합니다. */
            if (!new java.io.File(savePath).exists()) {
                try {
                    new java.io.File(savePath).mkdir();
                } catch (Exception e) {
                    e.getStackTrace();
                }
            }
            String path = savePath + "/" + name;
            files.transferTo(new java.io.File(path));

            uploadFoodDto = UploadFoodDto.builder()
                    .fileName(name)
                    .filePath(path)
                    .origFileName(origName)
                    .build();
        }  catch (Exception e) {
            e.printStackTrace();
        }
        return uploadFoodDto;
    }


    @Override
    public Long submit(UploadFoodDto uploadFoodDto,CreateFoodDto createFoodDto, Long categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isEmpty()) {
            return null;
        }
        Food food = createFoodDto.toEntity(optionalCategory.get());
        food.UploadImage(uploadFoodDto);


        return foodRepository.save(food).getId();
    }

    @Override
    public boolean delete(Long id) {
        Optional<Food> optionalFood = foodRepository.findById(id);
        if(optionalFood.isEmpty()){
            return false;
        }

        Food food = optionalFood.get();
        UploadFoodDto uploadFoodDto = UploadFoodDto.builder()
                .origFileName(food.getOrigFileName())
                .fileName(food.getFileName())
                .filePath(food.getFilePath())
                .build();

        File file = new File(uploadFoodDto.getFilePath());
        if(file.exists()){
            file.delete();
        }
        foodRepository.delete(food);
        return true;
    }

    @Override
    public Long updateFood(Long id, UpdateFoodDto dto) {
        Optional<Food> optionalFood = foodRepository.findById(id);
        Food food = optionalFood.get();
        food.UpdateFood(dto);
        return foodRepository.save(food).getId();
    }

    @Override
    public Long updateImage(Long id, UploadFoodDto newDto) {
        Optional<Food> optionalFood = foodRepository.findById(id);
        if(optionalFood.isEmpty()){
            return null;
        }
        Food food = optionalFood.get();
        UploadFoodDto origDto = UploadFoodDto.builder()
                .origFileName(food.getOrigFileName())
                .fileName(food.getFileName())
                .filePath(food.getFilePath())
                .build();

        File file = new File(origDto.getFilePath());
        if (file.exists()) {
            file.delete();
        }

        food.UpdateImage(newDto);
        return foodRepository.save(food).getId();
    }

    @Override
    public List<GetFoodDto> getFoodList() {
        List<Food> foodList = foodRepository.findAll();
        List<GetFoodDto> dtoList = new ArrayList<>();
        for (Food food : foodList) {
            GetFoodDto dto = GetFoodDto.builder()
                    .name(food.getName())
                    .id(food.getId())
                    .price(food.getPrice())
                    .content(food.getContent())
                    .build();
            dtoList.add(dto);
        }

        return dtoList;
    }

    @Override
    public List<GetFoodDto> getFoodListByCategory(Long categoryId) {
        List<Food> foodList = foodRepository.findByCategory_Id(categoryId);
        List<GetFoodDto> dtoList = new ArrayList<>();
        for (Food food : foodList) {
            GetFoodDto dto = GetFoodDto.builder()
                    .name(food.getName())
                    .id(food.getId())
                    .price(food.getPrice())
                    .content(food.getContent())
                    .build();
            dtoList.add(dto);
        }
        return dtoList;
    }

}
