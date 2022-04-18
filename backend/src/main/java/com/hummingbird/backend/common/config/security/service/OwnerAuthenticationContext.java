package com.hummingbird.backend.common.config.security.service;

import com.hummingbird.backend.owner.domain.Owner;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;

@Getter
public class OwnerAuthenticationContext extends User {
    private final Owner owner;

    public OwnerAuthenticationContext(Owner owner, List<GrantedAuthority> roles) {
        super(owner.getEmail(), owner.getPassword(), roles);
        this.owner = owner;
    }
}
