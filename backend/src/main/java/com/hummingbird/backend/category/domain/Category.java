package com.hummingbird.backend.category.domain;

import com.hummingbird.backend.menu.domain.Menu;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "menu_id")
    private Menu menu;


}
