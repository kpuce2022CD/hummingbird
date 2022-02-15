package com.hummingbird.backend.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long food_id;

    @Column(name = "food_name", length = 20)
    private String food_name;

    @Column(name = "food_describe",length = 100)
    private String food_describe;

    @Column(name = "food_price")
    private int food_price;

    @ManyToOne
    @JoinColumn(name = "menu_id")
    private Menu menu;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;



}
