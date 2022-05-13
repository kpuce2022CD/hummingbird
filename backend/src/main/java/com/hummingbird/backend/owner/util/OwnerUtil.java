package com.hummingbird.backend.owner.util;

import com.hummingbird.backend.owner.domain.Owner;
import com.hummingbird.backend.owner.repository.OwnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OwnerUtil {

    private final OwnerRepository ownerRepository;

    private static String getUserNameBySessionID(){
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return principal.getUsername();
    }

    public Owner getUserEntityBySessionID(){
        Owner principal = (Owner) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return principal;
    }
}
