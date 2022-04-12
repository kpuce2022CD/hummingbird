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

import javax.persistence.EntityNotFoundException;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
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

    //files
    @Override
    public UploadFoodDto upload(MultipartFile files){
        String name = null;
        String savePath= null;
        String path = null;
        String origName = null;

        try {
            origName = files.getOriginalFilename();
            name = new MD5Generator(origName).toString();
            savePath = System.getProperty("user.dir") +File.separator+ "files";

            /* 파일이 저장되는 폴더가 없으면 폴더를 생성합니다. */
            if (!new java.io.File(savePath).exists()) {
                try {
                    new java.io.File(savePath).mkdir();
                } catch (Exception e) {
                    e.getStackTrace();
                }
            }
            path = savePath + File.separator + name;
            files.transferTo(new java.io.File(path));

        }  catch (Exception e) {
            e.printStackTrace();
        }

        UploadFoodDto uploadFoodDto = UploadFoodDto.builder()
                .fileName(name)
                .filePath(path)
                .origFileName(origName)
                .build();

        return uploadFoodDto;

    }


    @Override
    public Long updateImage(Long foodId, UploadFoodDto newDto) {
        Food food = foodRepository.findById(foodId).orElseThrow();
        UploadFoodDto origDto = food.converToUploadFoodDto();

        File file = new File(origDto.getFilePath());
        if (file.exists()) {
            file.delete();
        }

        food.UpdateImage(newDto);
        return foodRepository.save(food).getId();
    }


    //create
    @Override
    public Long submit(UploadFoodDto uploadFoodDto,CreateFoodDto dto, Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow();
        Food food = dto.toEntity(category);
        food.UploadImage(uploadFoodDto);
        return foodRepository.save(food).getId();
    }

    //read
    @Override
    public List<GetFoodDto> getFoodListByCategory(Long categoryId) {
        List<Food> foodList = foodRepository.findByCategory_Id(categoryId);
        List<GetFoodDto> dtoList = new ArrayList<>();
        for (Food food : foodList) {
            GetFoodDto dto = food.convertToGetFoodDto();
            dtoList.add(dto);
        }
        return dtoList;
    }

    @Override
    public GetFoodDto getFood(Long foodId) {
        Food food = foodRepository.getFoodById(foodId).orElseThrow();
        return food.convertToGetFoodDto();
    }



    @Override
    public List<GetFoodDto> getFoodListByMenu(Long menuId){
        List<GetFoodDto> dtoList = new ArrayList<>();
        List<Category> categoryList = categoryRepository.findByMenu_Id(menuId);
        for(Category category:categoryList){
            List<Food> foodList = foodRepository.findByCategory_Id(category.getId());
            for(Food food: foodList){
                dtoList.add(food.convertToGetFoodDto());
            }
        }
        return dtoList;
    }

    @Override
    public Food getReferenceById(Long foodId) {
        return foodRepository.getById(foodId);
    }

    //update
    @Override
    public Long updateFood(Long foodId, UpdateFoodDto dto) {
        Food food= foodRepository.findById(foodId).orElseThrow();
        food.UpdateFood(dto);
        return foodRepository.save(food).getId();
    }

    //delete
    @Override
    public boolean delete(Long foodId) {
        Food food= foodRepository.findById(foodId).orElseThrow();
        UploadFoodDto uploadFoodDto =food.converToUploadFoodDto();

        File file = new File(uploadFoodDto.getFilePath());
        if(file.exists()){
            file.delete();
        }
        foodRepository.delete(food);
        return true;
    }


//
//    @Override
//    public List<GetFoodDto> getFoodList() {
//        List<Food> foodList = foodRepository.findAll();
//        List<GetFoodDto> dtoList = new ArrayList<>();
//        for (Food food : foodList) {
//            GetFoodDto dto = GetFoodDto.builder()
//                    .name(food.getName())
//                    .id(food.getId())
//                    .price(food.getPrice())
//                    .content(food.getContent())
//                    .build();
//            dtoList.add(dto);
//        }
//
//        return dtoList;
//    }





//    @Override
//    public Long update(Long id, String name, String describe, int price) {
//        Optional<Food> optionalFood = foodRepository.findById(id);
//        if (optionalFood.isEmpty()) {
//            return null;
//        }
//        Food food = optionalFood.get();
//        food.setName(name);
//        food.setContent(describe);
//        food.setPrice(price);
//        return food.getId();
//    }

//    @Override
//    public int deleteFoodsByMenuId(Long menuId) {
//        List<Food> foodList = foodRepository.findByMenu_Id(menuId);
//        int i;
//        for (i=0; i < foodList.size(); i++) {
//            foodRepository.delete(foodList.get(i));
//        }
//        return i;
//    }

//    @Override
//    public int deleteFoodsByCategoryId(Long categoryId) {
//        List<Food> foodList = foodRepository.findByCategory_Id(categoryId);
//        int i;
//        for (i=0; i < foodList.size(); i++) {
//            foodRepository.delete(foodList.get(i));
//        }
//        return i;
//    }


}
