package com.hummingbird.backend.service;

import com.hummingbird.backend.domain.Menu;
import com.hummingbird.backend.repository.MenuRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
public interface MenuService {
    Long submit(Menu menu);
    Optional<Menu> findOne(Long id);
    List<Menu> findAll();


}
