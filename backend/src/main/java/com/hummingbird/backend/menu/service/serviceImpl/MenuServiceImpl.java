package com.hummingbird.backend.menu.service.serviceImpl;

import com.hummingbird.backend.menu.domain.Menu;
import com.hummingbird.backend.menu.dto.CreateMenuDto;
import com.hummingbird.backend.menu.dto.GetMenuDto;
import com.hummingbird.backend.user.domain.Owner;
import com.hummingbird.backend.category.repository.CategoryRepository;
import com.hummingbird.backend.food.repository.FoodRepository;
import com.hummingbird.backend.menu.repository.MenuRepository;
import com.hummingbird.backend.menu.service.MenuService;
import com.hummingbird.backend.user.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class MenuServiceImpl implements MenuService {
    public final MenuRepository menuRepository;
    public final CategoryRepository categoryRepository;
    public final FoodRepository foodRepository;
    public final OwnerRepository ownerRepository;

    @Autowired
    public MenuServiceImpl(MenuRepository menuRepository, CategoryRepository categoryRepository, FoodRepository foodRepository, OwnerRepository ownerRepository) {
        this.menuRepository = menuRepository;
        this.categoryRepository = categoryRepository;
        this.foodRepository = foodRepository;
        this.ownerRepository = ownerRepository;
    }

    @Override
    public Long submit(CreateMenuDto dto,Long userId) {
        Optional<Owner> owner = ownerRepository.findById(userId);
        if (owner.isEmpty()) {
            return null;
        }
        Menu menu = Menu.builder()
                .name(dto.getName())
                .owner(owner.get())
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
       menu.changeName(name);


        return menuRepository.save(menu).getId();
    }

    @Override
    public GetMenuDto getMenu(Long id) {
        Optional<Menu> optionalMenu = menuRepository.findById(id);
        if (optionalMenu.isEmpty()) {
            return null;
        }
        Menu menu = optionalMenu.get();

        return GetMenuDto.builder()
                .name(menu.getName())
                .owner(menu.getOwner())
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
                    .owner(menu.getOwner())
                    .id(menu.getId())
                    .build();
            dtoList.add(dto);
        }
        return dtoList;
    }



}
