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

    @Column(name = "password",nullable = false)
    private String password;

    @Column(name = "business_registration_number",nullable = false)
    private String businessRegistrationNumber;


    @Builder
    public Owner(String email, String name, String businessRegistrationNumber) {
        this.email = email;
        this.name = name;
        this.businessRegistrationNumber = businessRegistrationNumber;
    }

    public static Owner toEntity(OwnerDto ownerDto) {
        return new Owner(ownerDto.getEmail(),
                ownerDto.getName(),
                ownerDto.getBusinessRegistrationNumber()
        );
    }
}
