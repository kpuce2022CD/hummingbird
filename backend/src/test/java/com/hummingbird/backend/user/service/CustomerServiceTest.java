package com.hummingbird.backend.user.service;

import com.hummingbird.backend.user.domain.Customer;
import com.hummingbird.backend.user.repository.CustomerRepository;
import com.hummingbird.backend.user.service.serviceImpl.GeneralCustomerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional
class CustomerServiceTest {

    @Autowired
    GeneralCustomerService customerService;

    @Autowired
    CustomerRepository customerRepository;

    @BeforeEach
    void setting(){
        customerRepository.deleteAll();
    }

    @DisplayName("회원 가입")
    @Test
    void testSginUp() throws Exception {

        // given
        Customer customer = new Customer("기현");
        // when
        Long savedCustomerId =customerService.signup(customer);
        // then
        assertEquals(customer, customerRepository.findCustomerById(savedCustomerId).orElseThrow());
    }

    @DisplayName("회원 중복 체크")
    @Test()
    void testDuplicatedCustomer() throws Exception {

        // given
        Customer customer1 = new Customer("기현");
        Customer customer2 = new Customer("기현");
        // when
        customerService.signup(customer1);
        // then
        assertThrows(IllegalStateException.class, () -> customerService.signup(customer2));
    }


}