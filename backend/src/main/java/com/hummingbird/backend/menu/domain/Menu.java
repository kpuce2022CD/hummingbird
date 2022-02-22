package com.hummingbird.backend.menu.domain;

import com.hummingbird.backend.user.domain.User;
import lombok.*;

import javax.persistence.*;

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
    @JoinColumn(name = "user_id")
    private User user;



    @Builder
    public Menu(Long id, String name, User user) {
        this.id = id;
        this.name = name;
        this.user = user;
    }

    //    @Column(name = "created_at")
//    private Date created_at;
//
//    @Column(name = "modified_at")
//    private Date modified_at;

}
