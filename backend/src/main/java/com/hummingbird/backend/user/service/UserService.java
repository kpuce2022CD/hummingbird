package com.hummingbird.backend.user.service;

import com.hummingbird.backend.user.domain.Customer;
import com.hummingbird.backend.user.dto.CustomerDto;
import org.springframework.security.crypto.password.PasswordEncoder;

public interface UserService {

    // 회원 가입
    public Long signup(CustomerDto customerDto,PasswordEncoder passwordEncoder);

    // 회원 조회
    Customer findCustomerById(Long id);

    // 이메일로 회원 조회
    Customer findCustomerByEmail(String email);

    // 회원 reference 조회
    Customer getReferenceById(Long id);

    // 회원 중복 검사
    public boolean isDuplicatedCustomer(CustomerDto customerDto, PasswordEncoder passwordEncoder);

    // 유효한 회원 인지 검증 하기 비밀 번호 비교
    public boolean isValidCustomer(CustomerDto customerDto, PasswordEncoder passwordEncoder);
}
