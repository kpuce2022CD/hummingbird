package com.hummingbird.backend.user.domain;

import com.hummingbird.backend.menu.domain.Menu;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name",length = 20)
    private String name;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Menu> menuList = new ArrayList<>();

}
