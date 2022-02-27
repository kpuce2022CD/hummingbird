package com.hummingbird.backend.user.service;

import com.hummingbird.backend.user.domain.Customer;
import com.hummingbird.backend.user.dto.CustomerDto;
import com.hummingbird.backend.user.repository.CustomerRepository;
import com.hummingbird.backend.user.service.serviceImpl.GeneralCustomerService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

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

    private CustomerDto customerDto;
    private CustomerDto customerDto1;

    private Customer customer;
    private Customer customer1;
    private Customer customer1Duplicated;

    @BeforeEach
    void setting(){

        customerDto = CustomerDto
                .builder()
                .name("기현")
                .token("기현token")
                .email("qwer123@naver.com")
                .password("zxcv1234~")
                .build();

        customerDto1 = CustomerDto
                .builder()
                .name("기현1")
                .token("기현1token")
                .email("qwer1231@naver.com")
                .password("zxcv1234~")
                .build();

        customer = customerDto.toEntity(passwordEncoder);
        customer1Duplicated = customerDto.toEntity(passwordEncoder);

        customer1 = customerDto1.toEntity(passwordEncoder);

    }

    @DisplayName("회원 가입 중복된 아이디 X")
    @Test
    void testSignUp() throws Exception {

        // given
        customerRepository.save(customer);

        // when
        customerService.isDuplicatedCustomer(customerDto1,passwordEncoder);
        Long savedCustomerId1 =customerService.signup(customerDto1,passwordEncoder);

        // then
        assertAll(
                () -> assertEquals(customer1.getEmail(), customerRepository.findCustomerById(savedCustomerId1).orElseThrow().getEmail())
        );

    }

    @DisplayName("중복된 아이디로 회원 가입 예외")
    @Test
    void testSignUpFailedDuplicated() throws Exception {

        // given
        customerService.signup(customerDto,passwordEncoder);

        // when

        // then
        assertAll(
                () -> assertTrue(customerService.isDuplicatedCustomer(customerDto, passwordEncoder))
        );



    }
    @DisplayName("Id로 회원 조회")
    @Test
    void testFindCustomerById() throws Exception {

        // given
        Long savedCustomerId =customerService.signup(customerDto,passwordEncoder);

        // when
        Customer savedCustomer = customerService.findCustomerById(savedCustomerId);

        // then
        Assertions.assertEquals(customer.getEmail(),savedCustomer.getEmail());

    }
    @DisplayName("Email 로 회원 조회")
    @Test
    void test() throws Exception {

        // given
        customerService.signup(customerDto,passwordEncoder);

        // when
        Customer savedCustomer = customerService.findCustomerByEmail(customerDto.getEmail());

        // then
        Assertions.assertEquals(customer.getEmail(),savedCustomer.getEmail());

    }

    @DisplayName("ID로 Customer Reference 조회")
    @Test
    void testGetReferenceById() throws Exception {

        // given
        Long savedCustomerId =customerService.signup(customerDto,passwordEncoder);

        // when
        Customer savedReferenceCustomer = customerService.getReferenceById(savedCustomerId);

        // then
        Assertions.assertEquals(customer.getEmail(),savedReferenceCustomer.getEmail());

    }

    @DisplayName("로그인을 위한 유효 Customer 검증")
    @Test
    void testIsValidCustomer() throws Exception {

        // given
        customerService.signup(customerDto,passwordEncoder);

        // when
        boolean isValidCustomer = customerService.isValidCustomer(customerDto,passwordEncoder);

        // then
        assertTrue(isValidCustomer);
    }
}