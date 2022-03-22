package com.hummingbird.backend.menu.controller;
import com.hummingbird.backend.menu.domain.Menu;
import com.hummingbird.backend.menu.dto.CreateMenuDto;
import com.hummingbird.backend.menu.dto.GetMenuDto;
import com.hummingbird.backend.menu.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SuppressWarnings("ALL")
@CrossOrigin("*")
@RestController
public class MenuController {

    private MenuService menuService;

    @Autowired
    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @PostMapping("/menu/new")
    public Long createMenu(@RequestBody CreateMenuDto dto, @RequestParam("userId") Long userId){
        return menuService.submit(dto,userId);
    }

    @PostMapping("/menu/update")
    public Long updateMenu(Long id,String name){
        //update 로직
        return menuService.update(id, name);
    }

    @PostMapping("/menu/delete")
    public boolean deleteMenu(Long id){
        return menuService.delete(id);
    }

    @GetMapping("/menu/get")
    public GetMenuDto getMenu(Long id){
        return menuService.getMenu(id);
    }

    @GetMapping("/menu/all")
    public List<GetMenuDto> getMenuAll(){
        return menuService.getMenuList();
    }

}
