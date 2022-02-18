package com.hummingbird.backend.service;

import com.hummingbird.backend.domain.Menu;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface MenuService {
    Long submit(Menu menu);
    boolean delete(Long id);
    Menu getMenu(Long id);
    List<Menu> getMenuList();


}
