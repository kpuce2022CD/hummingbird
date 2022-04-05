package com.hummingbird.backend.user.repository;


import com.hummingbird.backend.user.domain.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OwnerRepository extends JpaRepository<Owner,Long> {
    Optional<Owner> findOwnerById(Long id);
    Optional<Owner> findOwnerByEmail(String email);
}
