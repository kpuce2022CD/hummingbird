package com.hummingbird.backend.menu.service.serviceImpl;

import com.hummingbird.backend.menu.service.OwnerDetailsService;
import com.hummingbird.backend.user.domain.Owner;
import com.hummingbird.backend.user.repository.OwnerRepository;
import com.hummingbird.backend.user.service.OwnerAuthenticationContext;
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
