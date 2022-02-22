package com.hummingbird.backend.food.domain;

import com.hummingbird.backend.category.domain.Category;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@ToString
@Getter
@Setter
@Entity
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 20)
    private String name;

    @Column(name = "content",length = 100)
    private String content;

    @Column(name = "price")
    private int price;


    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "category_id")
    private Category category;



}
