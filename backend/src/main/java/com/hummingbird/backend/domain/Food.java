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

    @ManyToOne
    @JoinColumn(name = "menu")
    private Menu menu;

    @ManyToOne
    @JoinColumn(name = "category")
    private Category category;



}
