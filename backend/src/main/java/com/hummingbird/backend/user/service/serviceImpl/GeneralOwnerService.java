package com.hummingbird.backend.user.service.serviceImpl;

import com.hummingbird.backend.user.domain.Owner;
import com.hummingbird.backend.user.dto.OwnerDto;
import com.hummingbird.backend.user.dto.OwnerLoginRequest;
import com.hummingbird.backend.user.repository.OwnerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class GeneralOwnerService {

    private  final OwnerRepository ownerRepository;

    public Long signup(OwnerDto ownerDto, PasswordEncoder passwordEncoder){
        return ownerRepository.save(ownerDto.toEntity(passwordEncoder)).getId();
    }

    public Owner findOwnerById(Long id) {
        return ownerRepository.findOwnerById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Owner findOwnerByEmail(String email) {
        return ownerRepository.findOwnerByEmail(email).orElseThrow(EntityNotFoundException::new);
    }

    public Owner getReferenceById(Long id) {
        return ownerRepository.getById(id);
    }

    public boolean isDuplicatedCustomer(OwnerDto ownerDto, PasswordEncoder passwordEncoder) {
        Optional<Owner> customerToCheckDuplicated = ownerRepository.findOwnerByEmail(ownerDto.getEmail());
        if (customerToCheckDuplicated.isPresent()){
            log.info("{}은 이미 존재하는 회원입니다.",ownerDto.getName());
            return true;
        }
        return false;
    }

    public boolean isValidCustomer(OwnerLoginRequest ownerLoginRequest, PasswordEncoder passwordEncoder) {
        Owner owner = findOwnerByEmail(ownerLoginRequest.getEmail());
        // param1: 암호화 전, db에 저장된 암호화 된 비밀 번호
        return passwordEncoder.matches(ownerLoginRequest.getPassword(), owner.getPassword());
    }

}
