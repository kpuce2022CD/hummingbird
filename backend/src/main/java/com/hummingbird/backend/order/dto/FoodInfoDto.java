package com.hummingbird.backend.order.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FoodInfoDto{
    @JsonIgnore
    private Long id;
    private String name;
    private int price;
}
