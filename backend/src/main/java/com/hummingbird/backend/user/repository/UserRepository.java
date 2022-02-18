package com.hummingbird.backend.user.repository;


import com.hummingbird.backend.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
