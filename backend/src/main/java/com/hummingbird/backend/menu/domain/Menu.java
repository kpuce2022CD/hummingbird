package com.hummingbird.backend.menu.domain;

import com.hummingbird.backend.category.domain.Category;
import com.hummingbird.backend.common.domain.BaseTimeEntity;
import com.hummingbird.backend.menu.dto.GetMenuDto;
import com.hummingbird.backend.owner.domain.Owner;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;


@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Menu extends BaseTimeEntity {
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

    public GetMenuDto convertToGetMenuDto(){
        return GetMenuDto.builder()
                .name(name)
                .id(id)
                .build();
    }


}
