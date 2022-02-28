package com.hummingbird.backend.category.domain;

import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.menu.domain.Menu;
import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.*;

@Getter
@Entity
@ToString
@Setter
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "menu_id")
    private Menu menu;

    @OneToMany(mappedBy = "category",cascade = CascadeType.REMOVE)
    private List<Food> foodList = new ArrayList<>();

    @Builder
    public Category(Long id, String name, Menu menu) {
        this.id = id;
        this.name = name;
        this.menu = menu;
    }

    public void changeName(String name){
        this.name = name;
    }
}
