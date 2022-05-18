package com.hummingbird.backend.owner.domain;

import com.hummingbird.backend.owner.dto.OwnerDto;
import com.hummingbird.backend.owner.dto.OwnerInfoDto;
import com.hummingbird.backend.owner.dto.OwnerProfileDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    @Column(name = "is_removed",nullable = false)
    private Boolean isRemoved;

    @Column(name = "business_registration_number",nullable = false)
    private String businessRegistrationNumber;


    @Builder
    public Owner(String email, String name, String businessRegistrationNumber,String password) {
        this.email = email;
        this.name = name;
        this.businessRegistrationNumber = businessRegistrationNumber;
        this.password = password;
        this.isRemoved = false;
    }

    public static Owner toEntity(OwnerDto ownerDto) {
        return new Owner(ownerDto.getEmail(),
                ownerDto.getName(),
                ownerDto.getBusinessRegistrationNumber(),
                ownerDto.getPassword()
        );
    }
    public OwnerProfileDto toOwnerProfileDto() {
        return OwnerProfileDto
                .builder()
                .businessRegistrationNumber(getBusinessRegistrationNumber())
                .userEmail(getEmail())
                .userName(getName())
                .build();
    }

    public OwnerInfoDto toOwnerInfoDto() {
        return OwnerInfoDto
                .builder()
                .ownerId(getId())
                .businessRegistrationNumber(getBusinessRegistrationNumber())
                .userEmail(getEmail())
                .userName(getName())
                .build();
    }

    public void deleteOwner(){
        isRemoved = true;
    }
}
