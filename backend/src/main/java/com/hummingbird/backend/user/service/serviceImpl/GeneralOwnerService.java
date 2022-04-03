package com.hummingbird.backend.user.service.serviceImpl;

import com.hummingbird.backend.user.domain.Owner;
import com.hummingbird.backend.user.repository.OwnerRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
@Log4j2
public class GeneralOwnerService {

    private  final OwnerRepository ownerRepository;

    public GeneralOwnerService(OwnerRepository ownerRepository) {
        this.ownerRepository = ownerRepository;
    }

    /**
     *  회원 가입
     * @param owner
     * @return
     */
    public Long signup(Owner owner){

        isDuplicatedCustomer(owner);
        return ownerRepository.save(owner).getId();
    }

    public Owner findCustomerById(Long id) {
        return ownerRepository.findOwnerById(id).orElseThrow(EntityNotFoundException::new);
    }

    public void isDuplicatedCustomer(Owner owner) {
        Optional<Owner> ownerToCheckDuplicated = ownerRepository.findOwnerByEmail(owner.getEmail());
        if (ownerToCheckDuplicated.isPresent()){
            log.info("{}은 이미 존재하는 회원입니다.",owner.getName());
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

}
