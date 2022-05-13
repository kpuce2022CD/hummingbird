package com.hummingbird.backend.menu.service.serviceImpl;

import com.hummingbird.backend.menu.domain.Menu;
import com.hummingbird.backend.menu.dto.CreateMenuDto;
import com.hummingbird.backend.menu.dto.GetMenuDto;
import com.hummingbird.backend.owner.domain.Owner;
import com.hummingbird.backend.category.repository.CategoryRepository;
import com.hummingbird.backend.food.repository.FoodRepository;
import com.hummingbird.backend.menu.repository.MenuRepository;
import com.hummingbird.backend.menu.service.MenuService;
import com.hummingbird.backend.owner.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

        Menu menu = menuRepository.findById(id).orElseThrow();
        menuRepository.delete(menu);
        return true;
    }

    @Override
    public Long update(Long menuId, String menuName) {
        Menu menu = menuRepository.findById(menuId).orElseThrow();
       menu.changeName(menuName);
        return menuRepository.save(menu).getId();
    }

    @Override
    public GetMenuDto getMenu(Long id) {
        Menu menu = menuRepository.findById(id).orElseThrow();
        return menu.convertToGetMenuDto();
    }

    @Override
    public List<GetMenuDto> getMenuList(Long id) { //user id로 메뉴 가져오기
        List<GetMenuDto> dtoList = new ArrayList<>();
        Owner owner = ownerRepository.findOwnerById(id).orElseThrow();
        List<Menu> menuList = menuRepository.findAllByOwner(owner);
        for (Menu menu : menuList) {
            dtoList.add(menu.convertToGetMenuDto());
        }
        return dtoList;
    }

//    @Override
//    public List<GetMenuDto> getMenuList() {
//        List<Menu> menuList = menuRepository.findAll();
//        List<GetMenuDto> dtoList = null;
//
//        for(Menu menu:menuList){
//            GetMenuDto dto = GetMenuDto.builder()
//                    .name(menu.getName())
//                    .owner(menu.getOwner())
//                    .id(menu.getId())
//                    .build();
//            dtoList.add(dto);
//        }
//        return dtoList;
//    }



}
