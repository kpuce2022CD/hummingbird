package com.hummingbird.backend.category.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hummingbird.backend.category.dto.GetCategoryDto;
import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.menu.domain.Menu;
import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    public GetCategoryDto converToGetCategoryDto(){
        return GetCategoryDto.builder()
                .name(name)
                .id(id)
                .build();
    }
}
