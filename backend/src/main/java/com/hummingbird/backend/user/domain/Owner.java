package com.hummingbird.backend.user.domain;

import com.hummingbird.backend.user.dto.OwnerDto;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Owner extends User{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "email",nullable = false)
    private String email;


    @Builder
    public Owner(String email, String name) {
        this.email = email;
        this.name = name;
    }

    public static Owner toEntity(OwnerDto ownerDto) {
        return new Owner(ownerDto.getEmail(),ownerDto.getName());
    }
}
