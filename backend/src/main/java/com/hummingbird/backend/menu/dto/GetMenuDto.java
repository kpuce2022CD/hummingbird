package com.hummingbird.backend.menu.dto;

import com.hummingbird.backend.menu.domain.Menu;
import com.hummingbird.backend.user.domain.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Data
public class GetMenuDto{
    private Long id;
    private String name;
    private User user;

    @Builder
    public GetMenuDto(Long id, String name, User user) {
        this.id = id;
        this.name = name;
        this.user = user;
    }

    public Menu toEntity(){
        Menu menu= Menu.builder()
                .id(id)
                .name(name)
                .user(user)
                .build();

        return menu;
    }
}
