package com.hummingbird.backend.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Setter
@Getter
@Entity
public class Menu extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menu_id;

    @Column(name = "menu_name",length = 20)
    private String menu_name;

    @ManyToOne
    @JoinColumn(name = "user")
    private User user;

//    @Column(name = "created_at")
//    private Date created_at;
//
//    @Column(name = "modified_at")
//    private Date modified_at;

}
