package com.hummingbird.backend.menu.service.serviceImpl;

import com.hummingbird.backend.category.domain.Category;
import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.menu.domain.Menu;
import com.hummingbird.backend.menu.dto.CreateMenuDto;
import com.hummingbird.backend.menu.dto.GetMenuDto;
import com.hummingbird.backend.menu.dto.UpdateMenuDto;
import com.hummingbird.backend.user.domain.User;
import com.hummingbird.backend.category.repository.CategoryRepository;
import com.hummingbird.backend.food.repository.FoodRepository;
import com.hummingbird.backend.menu.repository.MenuRepository;
import com.hummingbird.backend.menu.service.MenuService;
import com.hummingbird.backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class MenuServiceImpl implements MenuService {
    public final MenuRepository menuRepository;
    public final CategoryRepository categoryRepository;
    public final FoodRepository foodRepository;
    public final UserRepository userRepository;

    @Autowired
    public MenuServiceImpl(MenuRepository menuRepository, CategoryRepository categoryRepository, FoodRepository foodRepository, UserRepository userRepository) {
        this.menuRepository = menuRepository;
        this.categoryRepository = categoryRepository;
        this.foodRepository = foodRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Long submit(CreateMenuDto dto,Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            return null;
        }
        Menu menu = Menu.builder()
                .name(dto.getName())
                .user(user.get())
                .build();
        Menu result = menuRepository.save(menu);
        return result.getId();
    }

    @Override
    public boolean delete(Long id) {

        Optional<Menu> menu = menuRepository.findById(id);
        if(!menu.isPresent()){
            return false;
        }

        List<Category> categoryList = categoryRepository.findByMenu_Id(id);
        System.out.println("categoryList : "+categoryList.size());

        for(int i=0;i<categoryList.size();i++){
            //food 삭제
            List<Food> foodList =
                    foodRepository.findByCategory_Id(categoryList.get(i).getId());
            foodRepository.deleteAll(foodList);
        }

        //category 삭제
        for (int i = 0; i < categoryList.size(); i++) {
            categoryRepository.delete(categoryList.get(i));
        }

        //menu 삭제
        menuRepository.delete(menu.get());
        return true;
    }

    @Override
    public Long update(Long id,String name) {
        Optional<Menu> optionalMenu = menuRepository.findById(id);
        if (optionalMenu.isEmpty()) {
            return null;
        }
        Menu menu = optionalMenu.get();
        menu.setName(name);
//        Menu menu = optionalMenu.get();
//        UpdateMenuDto dto = UpdateMenuDto
//                .builder()
//                .name(name)
//                .id(menu.getId())
//                .user(menu.getUser())
//                .createdDate(menu.getCreatedDate())
//                        .build();

        return menuRepository.save(menu).getId();
    }

    @Override
    public GetMenuDto getMenu(Long id) {
        Optional<Menu> optionalMenu = menuRepository.findById(id);
        if (!optionalMenu.isPresent()) {
            return null;
        }
        Menu menu = optionalMenu.get();

        return GetMenuDto.builder()
                .name(menu.getName())
                .user(menu.getUser())
                .id(menu.getId())
                .build();
    }

    @Override
    public List<GetMenuDto> getMenuList() {
        List<Menu> menuList = menuRepository.findAll();
        List<GetMenuDto> dtoList = null;

        for(Menu menu:menuList){
            GetMenuDto dto = GetMenuDto.builder()
                    .name(menu.getName())
                    .user(menu.getUser())
                    .id(menu.getId())
                    .build();
            dtoList.add(dto);
        }
        return dtoList;
    }



}
