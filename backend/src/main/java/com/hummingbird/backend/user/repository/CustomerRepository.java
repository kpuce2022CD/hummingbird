package com.hummingbird.backend.user.repository;


import com.hummingbird.backend.user.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Optional<Customer> findCustomerById(Long id);
    Optional<Customer> findCustomerByToken(String token);
    Optional<Customer> findCustomerByEmail(String email);
}
