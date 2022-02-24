package com.hummingbird.backend.user.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.user.dto.CustomerDto;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Customer {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id", nullable = false)
    private Long id;

    @Column(name = "token",nullable = false)
    private String token;

    @Column(name = "name",nullable = false)
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "customer")
    private List<Order> orders = new ArrayList<>();

    @Builder
    public Customer(String name) {
        //todo add token later
        this.token = name+"token";
        this.name = name;
    }

    public static Customer toEntity(CustomerDto customerDto) {
        //todo add token later
        return new Customer(customerDto.getName());
    }
}