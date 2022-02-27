package com.hummingbird.backend.menu.dto;

import com.hummingbird.backend.menu.domain.Menu;
import com.hummingbird.backend.user.domain.Owner;
import com.hummingbird.backend.user.domain.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Data
public class GetMenuDto{
    private Long id;
    private String name;
    private Owner owner;

    @Builder
    public GetMenuDto(Long id, String name, Owner owner) {
        this.id = id;
        this.name = name;
        this.owner = owner;
    }

    public Menu toEntity(){
        Menu menu= Menu.builder()
                .id(id)
                .name(name)
                .owner(owner)
                .build();

        return menu;
    }
}
