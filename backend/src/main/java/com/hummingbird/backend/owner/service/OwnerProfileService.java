package com.hummingbird.backend.owner.service;

import com.hummingbird.backend.owner.domain.Owner;
import com.hummingbird.backend.owner.dto.OwnerProfileDto;
import com.hummingbird.backend.owner.repository.OwnerRepository;
import com.hummingbird.backend.owner.util.OwnerUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OwnerProfileService {

    private final OwnerRepository ownerRepository;

    private final OwnerUtil ownerUtil;

    public OwnerProfileDto getOwnerProfile(){

        Owner ownerInfo = ownerUtil.getUserEntityBySessionID();
        return ownerInfo.toOwnerProfileDto();
    }

}
