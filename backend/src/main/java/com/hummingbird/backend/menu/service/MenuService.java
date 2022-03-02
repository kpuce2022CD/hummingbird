package com.hummingbird.backend.menu.service;

import com.hummingbird.backend.menu.domain.Menu;
import com.hummingbird.backend.menu.dto.CreateMenuDto;
import com.hummingbird.backend.menu.dto.GetMenuDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface MenuService {
    Long submit(CreateMenuDto dto,Long userId); //등록
    boolean delete(Long id); //삭제
    Long update(Long id,String name); //수정
    GetMenuDto getMenu(Long id); //id로 메뉴 가져오기
    List<GetMenuDto> getMenuList(); //메뉴 전체 가져오기



}
