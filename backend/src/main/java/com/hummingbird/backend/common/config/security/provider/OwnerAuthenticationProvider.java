package com.hummingbird.backend.common.config.security.provider;

import com.hummingbird.backend.common.config.security.service.OwnerAuthenticationContext;
import com.hummingbird.backend.common.config.security.service.OwnerDetailsService;
import com.hummingbird.backend.common.config.security.token.OwnerAuthenticationToken;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;

@RequiredArgsConstructor
public class OwnerAuthenticationProvider implements AuthenticationProvider {

    private OwnerDetailsService ownerDetailsService;
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String tryLoginEmail = authentication.getName();
        String tryLoginPassword = (String) authentication.getCredentials();

        OwnerAuthenticationContext ownerAuthenticationContext = (OwnerAuthenticationContext) ownerDetailsService.loadUserByUsername(tryLoginEmail);

        if (!passwordEncoder.matches(tryLoginPassword, ownerAuthenticationContext.getPassword())) {
          throw new BadCredentialsException("Invalid password");
        }

        return new OwnerAuthenticationToken(ownerAuthenticationContext.getOwner(),null,ownerAuthenticationContext.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(OwnerAuthenticationToken.class);
    }
}
