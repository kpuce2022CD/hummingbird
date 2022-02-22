package com.hummingbird.backend.category.domain;

import com.hummingbird.backend.menu.domain.Menu;
import lombok.*;

import javax.persistence.*;

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

}
