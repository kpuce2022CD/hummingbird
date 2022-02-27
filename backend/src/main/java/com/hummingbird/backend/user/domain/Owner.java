package com.hummingbird.backend.user.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.user.dto.CustomerDto;
import com.hummingbird.backend.user.dto.OwnerDto;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Owner extends User{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "owner_id", nullable = false)
    private Long id;

    @Column(name = "token",nullable = false)
    private String token;

    @Column(name = "name",nullable = false)
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "customer")
    private List<Order> orders = new ArrayList<>();

    @Builder
    public Owner(String token, String name) {
        //todo add token later
        this.token = name+"token";
        this.name = name;
    }

    public static Owner toEntity(OwnerDto ownerDto) {
        //todo add token later
        return new Owner(ownerDto.getToken(),ownerDto.getName());
    }
}
