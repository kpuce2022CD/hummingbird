package com.hummingbird.backend.owner.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class OwnerInfoDto {

    private Long ownerId;

    private String userName;

    private String userEmail;

    private String businessRegistrationNumber;
}
