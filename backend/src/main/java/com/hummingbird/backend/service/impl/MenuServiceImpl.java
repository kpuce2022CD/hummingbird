package com.hummingbird.backend.service.impl;

import com.hummingbird.backend.domain.Menu;
import com.hummingbird.backend.domain.User;
import com.hummingbird.backend.repository.MenuRepository;
import com.hummingbird.backend.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class MenuServiceImpl implements MenuService {
    public final MenuRepository menuRepository;

    @Autowired
    public MenuServiceImpl(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    @Override
    public Long submit(Menu menu) {
        User user =new User();
        user.setUser_id(1L);
        user.setUser_name("song");
        menu.setUser(user);
        menuRepository.save(menu);
        return menu.getMenu_id();
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
