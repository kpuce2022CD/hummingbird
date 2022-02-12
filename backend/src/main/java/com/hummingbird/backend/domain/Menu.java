package com.hummingbird.backend.domain;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menu_id;

    @Column(name = "menu_name",length = 20)
    private String menu_name;

    @ManyToOne
    @JoinColumn(name = "user")
    private User user;

    @Column(name = "created_at")
    private Date created_at;

    @Column(name = "modified_at")
    private Date modified_at;

    public Long getMenu_id() {
        return menu_id;
    }

    public void setMenu_id(Long menu_id) {
        this.menu_id = menu_id;
    }

    public String getMenu_name() {
        return menu_name;
    }

    public void setMenu_name(String menu_name) {
        this.menu_name = menu_name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public Date getModified_at() {
        return modified_at;
    }

    public void setModified_at(Date modified_at) {
        this.modified_at = modified_at;
    }
}
