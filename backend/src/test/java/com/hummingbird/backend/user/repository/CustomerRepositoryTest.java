package com.hummingbird.backend.user.repository;

import com.hummingbird.backend.user.domain.Customer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
// DataJpaTest는 자동으로 내장 db에 연결하는데 mysql에 연결하고자 했기 때문
// 운영 환경과 db를 맞추기 위해 설정 했다.
// [참고]https://charliezip.tistory.com/21
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class CustomerRepositoryTest {

    @Autowired CustomerRepository customerRepository;

    @Test
    void save() {
        Customer customer = new Customer("Java");
        customerRepository.save(customer);
        Customer findCustomer = customerRepository.findCustomerById(customer.getId()).orElseThrow();
        assertEquals(findCustomer.getName(),customer.getName());
    }

}