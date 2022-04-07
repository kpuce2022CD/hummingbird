package com.hummingbird.backend.menu.controller;
import com.hummingbird.backend.menu.dto.CreateMenuDto;
import com.hummingbird.backend.menu.dto.GetMenuDto;
import com.hummingbird.backend.menu.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
    @PostMapping(value = "/menu/new")
    public Long createMenu(@RequestBody HashMap<String, Object> data){
        CreateMenuDto dto = CreateMenuDto.builder()
                .name((String) data.get("menuName"))
                .build();
        return menuService.submit(dto, Long.parseLong((String)data.get("ownerId")));
    }

    //read
    @GetMapping( "/menu/get/owner") //owner 아이디로 조회
    public List<GetMenuDto> getMenuByOwner(Long ownerId){
        return menuService.getMenuList(ownerId);
    }

    @GetMapping( "/menu/get") //메뉴 아이디로 조회
    public GetMenuDto getMenu(Long menuId){
        return menuService.getMenu(menuId);
    }

    //update
    @PostMapping("/menu/update")
    public Long updateMenu(@RequestBody HashMap<String, Object> data){
        return menuService.update(Long.parseLong((String)data.get("menuId")), (String) data.get("updateName"));
    }

    //delete
    @PostMapping("/menu/delete")
    public boolean deleteMenu(Long menuId){
        return menuService.delete(menuId);
    }


}
