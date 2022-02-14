package com.hummingbird.backend.controller;
import com.hummingbird.backend.domain.Menu;
import com.hummingbird.backend.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SuppressWarnings("ALL")
@RestController
public class MenuController {

    private MenuService menuService;

    @Autowired
    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @PostMapping("/menu/new")
    public Long create(@RequestBody Menu menu){
        menuService.submit(menu);
        return menu.getMenu_id();
    }

    @PostMapping("/menu/delete")
    public boolean delete(Long id){
        return menuService.delete(id);
    }

    @GetMapping("/menu/get")
    public Menu getMenu(Long id){
        return menuService.getMenu(id);
    }

    @GetMapping("/menu/all")
    public List<Menu> getMenuAll(){
        return menuService.getMenuList();
    }

}
