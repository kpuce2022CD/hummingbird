package com.hummingbird.backend.owner.domain;

import com.hummingbird.backend.owner.dto.OwnerDto;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Owner {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name",nullable = false)
    private String name;

    @Column(name = "email",nullable = false)
    private String email;

    @Column(name = "password",nullable = false)
    private String password;

    @Column(name = "business_registration_number",nullable = false)
    private String businessRegistrationNumber;


    @Builder
    public Owner(String email, String name, String businessRegistrationNumber,String password) {
        this.email = email;
        this.name = name;
        this.businessRegistrationNumber = businessRegistrationNumber;
        this.password = password;
    }

    public static Owner toEntity(OwnerDto ownerDto) {
        return new Owner(ownerDto.getEmail(),
                ownerDto.getName(),
                ownerDto.getBusinessRegistrationNumber(),
                ownerDto.getPassword()
        );
    }
}
