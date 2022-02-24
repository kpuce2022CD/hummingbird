package com.hummingbird.backend.menu.domain;

import com.hummingbird.backend.category.domain.Category;
import com.hummingbird.backend.user.domain.User;
import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.*;


@ToString
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
    private User user;

    @OneToMany(mappedBy = "menu",cascade = CascadeType.REMOVE)
    private List<Category> categoryList = new ArrayList<>();



    @Builder
    public Menu(Long id, String name, User user) {
        this.id = id;
        this.name = name;
        this.user = user;
    }

    public void changeName(String name){
        this.name = name;
    }


}
