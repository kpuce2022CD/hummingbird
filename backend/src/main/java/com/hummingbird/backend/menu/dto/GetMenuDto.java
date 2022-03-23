package com.hummingbird.backend.menu.dto;

import com.hummingbird.backend.menu.domain.Menu;
import com.hummingbird.backend.user.domain.Owner;
import com.hummingbird.backend.user.domain.User;
import lombok.*;


@Data
public class GetMenuDto{
    private Long id;
    private String name;

    @Builder
    public GetMenuDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Menu toEntity(Owner owner){
        Menu menu= Menu.builder()
                .id(id)
                .name(name)
                .owner(owner)
                .build();

        return menu;
    }
}
