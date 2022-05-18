package com.hummingbird.backend.owner.service.serviceImpl;

import com.hummingbird.backend.owner.domain.Owner;
import com.hummingbird.backend.owner.dto.OwnerDto;
import com.hummingbird.backend.owner.dto.OwnerInfoDto;
import com.hummingbird.backend.owner.dto.OwnerLoginRequest;
import com.hummingbird.backend.owner.repository.OwnerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class GeneralOwnerService {

    private final OwnerRepository ownerRepository;

    public Long signup(OwnerDto ownerDto, PasswordEncoder passwordEncoder) {
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
        if (customerToCheckDuplicated.isPresent()) {
            log.info("{}은 이미 존재하는 회원입니다.", ownerDto.getName());
            return true;
        }
        return false;
    }

    public boolean isValidCustomer(OwnerLoginRequest ownerLoginRequest, PasswordEncoder passwordEncoder) {
        Owner owner = findOwnerByEmail(ownerLoginRequest.getEmail());
        // param1: 암호화 전, db에 저장된 암호화 된 비밀 번호
        return passwordEncoder.matches(ownerLoginRequest.getPassword(), owner.getPassword());
    }

    public void deleteOwnerById(Long id) {
        Owner owner = ownerRepository.findOwnerById(id).orElseThrow();
        owner.deleteOwner();
    }

    public List<OwnerInfoDto> readOwnerInfoAll() {
        List<Owner> ownerList = ownerRepository.findAll();
        List<OwnerInfoDto> ownerInfoDtos = new ArrayList<OwnerInfoDto>();
        for (Owner owner: ownerList){
            if (!owner.getIsRemoved()){
                ownerInfoDtos.add(owner.toOwnerInfoDto());
            }
        }
        return ownerInfoDtos;
    }
}
