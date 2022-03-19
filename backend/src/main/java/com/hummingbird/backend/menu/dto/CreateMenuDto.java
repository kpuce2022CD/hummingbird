package com.hummingbird.backend.menu.dto;

import com.hummingbird.backend.menu.domain.Menu;
import com.hummingbird.backend.user.domain.Owner;
import com.hummingbird.backend.user.domain.User;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

@Data
@NoArgsConstructor
public class CreateMenuDto{
    private String name;

    @Builder
    public CreateMenuDto(String name) {
        this.name = name;
    }

    public Menu toEntity(Owner owner){
        Menu menu = Menu.builder()
                .name(name)
                .owner(owner)
                .build();
        return menu;
    }
}