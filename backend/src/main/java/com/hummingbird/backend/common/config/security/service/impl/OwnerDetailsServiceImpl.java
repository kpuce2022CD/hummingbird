package com.hummingbird.backend.common.config.security.service.impl;

import com.hummingbird.backend.common.config.security.service.OwnerAuthenticationContext;
import com.hummingbird.backend.common.config.security.service.OwnerDetailsService;
import com.hummingbird.backend.owner.domain.Owner;
import com.hummingbird.backend.owner.repository.OwnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class OwnerDetailsServiceImpl implements OwnerDetailsService {

    private final OwnerRepository ownerRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Owner owner = ownerRepository.findOwnerByEmail(email).orElseThrow(EntityNotFoundException::new);

        List<GrantedAuthority> roles = Collections.emptyList();
        return new OwnerAuthenticationContext(owner, roles);
    }
}
