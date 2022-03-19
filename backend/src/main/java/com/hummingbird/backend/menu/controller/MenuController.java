package com.hummingbird.backend.menu.controller;
import com.hummingbird.backend.menu.domain.Menu;
import com.hummingbird.backend.menu.dto.CreateMenuDto;
import com.hummingbird.backend.menu.dto.GetMenuDto;
import com.hummingbird.backend.menu.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@SuppressWarnings("ALL")
@RestController
public class MenuController {

    private MenuService menuService;

    @Autowired
    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    //create
    @PostMapping("/menu/new")
    public Long createMenu(@RequestBody CreateMenuDto dto, @RequestParam("id") Long id){
        return menuService.submit(dto,id);
    }

    //read
    @GetMapping( "/menu/get/owner") //owner 아이디로 조회
    public List<GetMenuDto> getMenuByOwner(Long id){
        return menuService.getMenuList(id);
    }

    @GetMapping( "/menu/get") //메뉴 아이디로 조회
    public GetMenuDto getMenu(Long id){
        return menuService.getMenu(id);
    }






    //update
    @PostMapping("/menu/update")
    public Long updateMenu(Long id,String name){
        //update 로직
        return menuService.update(id, name);
    }

    //delete
    @PostMapping("/menu/delete")
    public boolean deleteMenu(Long id){
        return menuService.delete(id);
    }


}
