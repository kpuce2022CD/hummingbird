package com.hummingbird.backend.menu.domain;

import com.hummingbird.backend.category.domain.Category;
import com.hummingbird.backend.user.domain.Owner;
import com.hummingbird.backend.user.domain.User;
import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.*;


@Getter
@Entity
@Setter
@NoArgsConstructor
public class Menu extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name",length = 20)
    private String name;

    @ManyToOne(fetch = LAZY)
    private Owner owner;

    @OneToMany(mappedBy = "menu",cascade = CascadeType.REMOVE)
    private List<Category> categoryList = new ArrayList<>();



    @Builder
    public Menu(Long id, String name, Owner owner) {
        this.id = id;
        this.name = name;
        this.owner = owner;
    }

    public void changeName(String name){
        this.name = name;
    }


}
