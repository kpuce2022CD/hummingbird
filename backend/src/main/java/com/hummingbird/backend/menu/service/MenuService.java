package com.hummingbird.backend.menu.service;

import com.hummingbird.backend.menu.dto.CreateMenuDto;
import com.hummingbird.backend.menu.dto.GetMenuDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface MenuService {
    Long submit(CreateMenuDto dto,Long ownerId); //등록
    boolean delete(Long menuId); //삭제
    Long update(Long id, String menuName); //수정
    GetMenuDto getMenu(Long menuId); //id로 메뉴 가져오기
    List<GetMenuDto> getMenuList(Long ownerId); //메뉴 전체 가져오기



}
