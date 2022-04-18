package com.hummingbird.backend.common.config.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hummingbird.backend.common.config.security.token.OwnerAuthenticationToken;
import com.hummingbird.backend.owner.dto.OwnerDto;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class OwnerLoginProcessingFilter extends AbstractAuthenticationProcessingFilter {

    private static final String XML_HTTP_REQUEST = "XMLHttpRequest";
    private static final String X_REQUESTED_WITH = "X-Requested-With";

    private ObjectMapper objectMapper = new ObjectMapper();

    public OwnerLoginProcessingFilter() {
        super(new AntPathRequestMatcher("/ajaxLogin", "POST"));
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException {
        OwnerDto ownerDto = objectMapper.readValue(request.getReader(), OwnerDto.class);

        if (StringUtils.isEmpty(ownerDto.getEmail()) || StringUtils.isEmpty(ownerDto.getPassword())) {
            throw new AuthenticationServiceException("Username or Password not provided");
        }
        OwnerAuthenticationToken token = new OwnerAuthenticationToken(ownerDto.getEmail(),ownerDto.getPassword());

        return this.getAuthenticationManager().authenticate(token);
    }
}
