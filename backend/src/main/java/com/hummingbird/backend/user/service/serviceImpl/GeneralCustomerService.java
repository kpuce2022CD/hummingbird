package com.hummingbird.backend.user.service.serviceImpl;

import com.hummingbird.backend.user.domain.Customer;
import com.hummingbird.backend.user.dto.CustomerDto;
import com.hummingbird.backend.user.repository.CustomerRepository;
import com.hummingbird.backend.user.service.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
@Log4j2
public class GeneralCustomerService implements UserService {

    private final CustomerRepository customerRepository;

    @Autowired
    public GeneralCustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    /**
     *  회원 가입
     * @param customerDto
     * @return
     */
    @Override
    public Long signup(CustomerDto customerDto,PasswordEncoder passwordEncoder){
        return customerRepository.save(customerDto.toEntity(passwordEncoder)).getId();
    }

    @Override
    public Customer findCustomerById(Long id) {
        return customerRepository.findCustomerById(id).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public Customer findCustomerByEmail(String email) {
        return customerRepository.findCustomerByEmail(email).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public Customer getReferenceById(Long id) {
        return customerRepository.getById(id);
    }

    @Override
    public boolean isDuplicatedCustomer(CustomerDto customerDto, PasswordEncoder passwordEncoder) {
        Optional<Customer> customerToCheckDuplicated = customerRepository.findCustomerByEmail(customerDto.getEmail());
        if (customerToCheckDuplicated.isPresent()){
            log.info("{}은 이미 존재하는 회원입니다.",customerDto.getName());
            return true;
        }
        return false;
    }

    @Override
    public boolean isValidCustomer(CustomerDto customerDto, PasswordEncoder passwordEncoder) {
        Customer customer = findCustomerByEmail(customerDto.getEmail());
        // param1: 암호화 전, db에 저장된 암호화 된 비밀 번호
        return passwordEncoder.matches(customerDto.getPassword(), customer.getPassword());
    }

}
