package com.hummingbird.backend.owner.service;

import com.hummingbird.backend.owner.domain.Owner;
import com.hummingbird.backend.owner.dto.OwnerDto;
import org.springframework.security.crypto.password.PasswordEncoder;

public interface OwnerService {

    // 회원 가입
    public Long signup(OwnerDto ownerDto,PasswordEncoder passwordEncoder);

    // 회원 조회
    Owner findOwnerById(Long id);

    // 이메일로 회원 조회
    Owner findOwnerByEmail(String email);

    // 회원 reference 조회
    Owner getReferenceById(Long id);

    // 회원 중복 검사n
    public boolean isDuplicatedOwner(OwnerDto ownerDto, PasswordEncoder passwordEncoder);

    // 유효한 회원 인지 검증 하기 비밀 번호 비교
    public boolean isValidOwner(OwnerDto customerDto, PasswordEncoder passwordEncoder);
}
