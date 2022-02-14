package com.hummingbird.backend.service.impl;

import com.hummingbird.backend.domain.Menu;
import com.hummingbird.backend.repository.MenuRepository;
import com.hummingbird.backend.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
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
        menuRepository.save(menu);
        return menu.getMenu_id();
    }

    @Override
    public Optional<Menu> findOne(Long id) {
        return menuRepository.findById(id);
    }

    @Override
    public List<Menu> findAll() {
        return null;
    }
}
