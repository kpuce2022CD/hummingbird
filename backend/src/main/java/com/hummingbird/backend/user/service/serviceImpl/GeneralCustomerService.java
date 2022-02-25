package com.hummingbird.backend.user.service.serviceImpl;

import com.hummingbird.backend.user.domain.Customer;
import com.hummingbird.backend.user.repository.CustomerRepository;
import com.hummingbird.backend.user.service.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
@Log4j2
public class GeneralCustomerService implements UserService {

    private  final CustomerRepository customerRepository;

    public GeneralCustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    /**
     *  회원 가입
     * @param customer
     * @return
     */
    @Override
    public Long signup(Customer customer){

        isDuplicatedCustomer(customer);
        return customerRepository.save(customer).getId();
    }

    @Override
    public Customer findCustomerById(Long id) {
        return customerRepository.findCustomerById(id).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public Customer getReferenceById(Long id) {
        return customerRepository.getById(id);
    }

    @Override
    public void isDuplicatedCustomer(Customer customer) {
        Optional<Customer> customerToCheckDuplicated = customerRepository.findCustomerByToken(customer.getToken());
        if (customerToCheckDuplicated.isPresent()){
            log.info("{}은 이미 존재하는 회원입니다.",customer.getName());
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

}
