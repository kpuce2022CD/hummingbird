package com.hummingbird.backend.menu.dto;

import com.hummingbird.backend.menu.domain.Menu;
import com.hummingbird.backend.user.domain.User;
import lombok.*;

import java.sql.Date;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Setter
@Getter
public class UpdateMenuDto {
    private Long id;
    private String name;
    private User user;
    private LocalDateTime createdDate;

    @Builder
    public UpdateMenuDto(Long id, String name, User user,LocalDateTime createdDate) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.createdDate =createdDate;

    }


    public Menu toEntity(){
        Menu menu = Menu.builder()
                .name(name)
                .user(user)
                .id(id)
                .build();
        return menu;
    }
}