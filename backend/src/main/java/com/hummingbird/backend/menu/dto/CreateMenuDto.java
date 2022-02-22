package com.hummingbird.backend.menu.dto;

import com.hummingbird.backend.menu.domain.Menu;
import com.hummingbird.backend.user.domain.User;
import lombok.*;

@Data
@NoArgsConstructor
@Setter
@Getter
public class CreateMenuDto{
    private String name;

    @Builder
    public CreateMenuDto(String name) {
        this.name = name;
    }

    public Menu toEntity(User user){
        Menu menu = Menu.builder()
                .name(name)
                .user(user)
                .build();
        return menu;
    }
}