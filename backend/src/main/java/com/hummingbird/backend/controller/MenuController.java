package com.hummingbird.backend.controller;
import com.hummingbird.backend.domain.Menu;
import com.hummingbird.backend.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@SuppressWarnings("ALL")
@Controller
public class MenuController {

    private MenuService menuService;

    @Autowired
    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @PostMapping("/menu/new")
    public String create(@RequestBody Menu menu){
        menuService.submit(menu);
        return "redirect:/";
    }
}
