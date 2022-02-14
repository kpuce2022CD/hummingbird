package com.hummingbird.backend.controller;
import com.hummingbird.backend.domain.Menu;
import com.hummingbird.backend.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
        try{
            menuService.submit(menu);
            return menu.getMenu_id();
        }catch (Exception e){
            e.printStackTrace();
        }
        return -1L;
    }
}