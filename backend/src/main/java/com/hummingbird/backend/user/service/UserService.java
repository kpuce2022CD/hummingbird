package com.hummingbird.backend.user.service;

import com.hummingbird.backend.user.domain.Customer;

public interface UserService {

    // 회원 가입
    Long signup(Customer customer);

    // 회원 조회
    Customer findCustomerById(Long id);
    // 회원 reference 조회
    Customer getReferenceById(Long id);

    // 회원 중복 검사
    void isDuplicatedCustomer(Customer customer);
}
