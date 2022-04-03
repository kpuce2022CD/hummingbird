package com.hummingbird.backend.user.service;

import com.hummingbird.backend.user.domain.Owner;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public class OwnerAuthenticationContext extends User {
    private Owner owner;

    public OwnerAuthenticationContext(Owner owner, List<GrantedAuthority> roles) {
        super(owner.getName(), owner.getPassword(), roles);
        this.owner = owner;
    }
}
