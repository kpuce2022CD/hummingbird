package com.hummingbird.backend.user.repository;

import com.hummingbird.backend.user.domain.Customer;
import com.hummingbird.backend.user.dto.CustomerDto;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.EntityNotFoundException;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
// DataJpaTest는 자동으로 내장 db에 연결하는데 mysql에 연결하고자 했기 때문
// 운영 환경과 db를 맞추기 위해 설정 했다.
// [참고]https://charliezip.tistory.com/21
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class CustomerRepositoryTest {

    @Autowired
    CustomerRepository customerRepository;

    @Mock
    PasswordEncoder passwordEncoder;

    @Test
    void save() {
        CustomerDto customerDto = CustomerDto
                .builder()
                .name("JAVA")
                .email("email@gmail.com")
                .token("JAVATOKEN")
                .build();
        Customer customer = customerDto.toEntity(passwordEncoder);
        customerRepository.save(customer);
        Customer findCustomer = customerRepository.findCustomerById(customer.getId()).orElseThrow(EntityNotFoundException::new);
        assertEquals(findCustomer.getName(),customer.getName());
    }

}