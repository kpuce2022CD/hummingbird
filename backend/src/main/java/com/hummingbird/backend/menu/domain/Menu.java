package com.hummingbird.backend.menu.domain;

import com.hummingbird.backend.user.domain.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
public class Menu extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name",length = 20)
    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

//    @Column(name = "created_at")
//    private Date created_at;
//
//    @Column(name = "modified_at")
//    private Date modified_at;

}
