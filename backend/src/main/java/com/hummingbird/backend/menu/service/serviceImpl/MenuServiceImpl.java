package com.hummingbird.backend.menu.service.serviceImpl;

import com.hummingbird.backend.category.domain.Category;
import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.menu.domain.Menu;
import com.hummingbird.backend.user.domain.User;
import com.hummingbird.backend.category.repository.CategoryRepository;
import com.hummingbird.backend.food.repository.FoodRepository;
import com.hummingbird.backend.menu.repository.MenuRepository;
import com.hummingbird.backend.menu.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class MenuServiceImpl implements MenuService {
    public final MenuRepository menuRepository;
    public final CategoryRepository categoryRepository;
    public final FoodRepository foodRepository;

    @Autowired
    public MenuServiceImpl(MenuRepository menuRepository, CategoryRepository categoryRepository, FoodRepository foodRepository) {
        this.menuRepository = menuRepository;
        this.categoryRepository = categoryRepository;
        this.foodRepository = foodRepository;
    }

    @Override
    public Long submit(Menu menu) {
        User user =new User();
        user.setId(1L);
        menu.setUser(user);
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
            System.out.println("id : "+categoryList.get(i).getId());
            List<Food> foodList =
                    foodRepository.findByCategory_Id(categoryList.get(i).getId());
            foodRepository.deleteAll(foodList);
//            if(foodList.size()>0){
//                for (int j = 0; i < foodList.size(); i++) {
//                    foodRepository.delete(foodList.get(i));
//                }
//            }


        }

        for (int i = 0; i < categoryList.size(); i++) {
            categoryRepository.delete(categoryList.get(i));
        }

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
        menuRepository.save(menu);
        return menu.getId();
    }

    @Override
    public Menu getMenu(Long id) {
        Optional<Menu> optionalMenu = menuRepository.findById(id);
        if (!optionalMenu.isPresent()) {
            return null;
        }
        return optionalMenu.get();
    }

    @Override
    public List<Menu> getMenuList() {
        List<Menu> menuList = menuRepository.findAll();
        return menuList;
    }



}
