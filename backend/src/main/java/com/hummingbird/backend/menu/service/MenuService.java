package com.hummingbird.backend.menu.service;

import com.hummingbird.backend.menu.domain.Menu;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface MenuService {
    Long submit(Menu menu); //등록
    boolean delete(Long id); //삭제
    Long update(Long id,String name); //수정
    Menu getMenu(Long id); //id로 메뉴 가져오기
    List<Menu> getMenuList(); //메뉴 전체 가져오기



}
