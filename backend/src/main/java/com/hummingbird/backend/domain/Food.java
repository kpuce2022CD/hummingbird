package com.hummingbird.backend.domain;

import javax.persistence.*;

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

    public Long getFood_id() {
        return food_id;
    }

    public void setFood_id(Long food_id) {
        this.food_id = food_id;
    }

    public String getFood_name() {
        return food_name;
    }

    public void setFood_name(String food_name) {
        this.food_name = food_name;
    }

    public String getFood_describe() {
        return food_describe;
    }

    public void setFood_describe(String food_describe) {
        this.food_describe = food_describe;
    }

    public Menu getMenu() {
        return menu;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
