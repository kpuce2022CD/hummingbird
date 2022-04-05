package com.hummingbird.backend.common.config.security.token;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Collections;

public class OwnerAuthenticationToken extends AbstractAuthenticationToken {

    private final Object principal;
    private Object credentials;

    public OwnerAuthenticationToken(Object principal, Object credentials) {
    super(Collections.emptyList());
        this.principal = principal;
        this.credentials = credentials;
        setAuthenticated(false);
    }
    public OwnerAuthenticationToken(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.principal = principal;
        this.credentials = credentials;
        super.setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return this.credentials;
    }

    @Override
    public Object getPrincipal() {
        return this.principal;
    }
}
