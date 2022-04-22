package com.hummingbird.backend.owner.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.transaction.Transactional;

import static com.hummingbird.backend.init.DBInit.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

@SpringBootTest
@Transactional
@ExtendWith(MockitoExtension.class)
class CustomerServiceTest{

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private GeneralCustomerService customerService;

    @Autowired
    private CustomerRepository customerRepository;

    private CustomerDto customerDto1;
    private CustomerDto customerDto2;

    private Customer customer1;
    private Customer customer2;
    private Customer customer1Duplicated;

    @BeforeEach
    void setting(){

        customer1 = CUSTOMER_1;
        customer2 = CUSTOMER_2;

        customerDto1 = Customer_REQUEST_DTO;
        customerDto2 = Customer_DTO_2;

        customer1 = customerDto1.toEntity(passwordEncoder);
        customer1Duplicated = customerDto1.toEntity(passwordEncoder);

        customer2 = customerDto2.toEntity(passwordEncoder);

    }

    @DisplayName("회원 가입 중복된 아이디 X")
    @Test
    void testSignUp() throws Exception {

        // given
        customerRepository.save(customer1);

        // when
        customerService.isDuplicatedCustomer(customerDto2,passwordEncoder);
        Long savedCustomerId2 =customerService.signup(customerDto2,passwordEncoder);

        // then
        assertAll(
                () -> assertEquals(customer2.getEmail(), customerRepository.findCustomerById(savedCustomerId2).orElseThrow().getEmail())
        );

    }

    @DisplayName("중복된 아이디로 회원 가입 예외")
    @Test
    void testSignUpFailedDuplicated() throws Exception {

        // given
        customerService.signup(customerDto1,passwordEncoder);

        // when

        // then
        assertAll(
                () -> assertTrue(customerService.isDuplicatedCustomer(customerDto1, passwordEncoder))
        );



    }
    @DisplayName("Id로 회원 조회")
    @Test
    void testFindCustomerById() throws Exception {

        // given
        Long savedCustomerId =customerService.signup(customerDto1,passwordEncoder);

        // when
        Customer savedCustomer = customerService.findCustomerById(savedCustomerId);

        // then
        Assertions.assertEquals(customer1.getEmail(),savedCustomer.getEmail());

    }
    @DisplayName("Email 로 회원 조회")
    @Test
    void test() throws Exception {

        // given
        customerService.signup(customerDto1,passwordEncoder);

        // when
        Customer savedCustomer = customerService.findCustomerByEmail(customerDto1.getEmail());

        // then
        Assertions.assertEquals(customer1.getEmail(),savedCustomer.getEmail());

    }

    @DisplayName("ID로 Customer Reference 조회")
    @Test
    void testGetReferenceById() throws Exception {

        // given
        Long savedCustomerId =customerService.signup(customerDto1,passwordEncoder);

        // when
        Customer savedReferenceCustomer = customerService.getReferenceById(savedCustomerId);

        // then
        Assertions.assertEquals(customer1.getEmail(),savedReferenceCustomer.getEmail());

    }

    @DisplayName("로그인을 위한 유효 Customer 검증")
    @Test
    void testIsValidCustomer() throws Exception {

        // given
        customerService.signup(customerDto1,passwordEncoder);

        // when
        boolean isValidCustomer = customerService.isValidCustomer(customerDto1,passwordEncoder);

        // then
        assertTrue(isValidCustomer);
    }
}