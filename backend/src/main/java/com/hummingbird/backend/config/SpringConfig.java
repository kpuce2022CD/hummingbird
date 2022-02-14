package com.hummingbird.backend.config;

import com.hummingbird.backend.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.persistence.EntityManager;

@EnableJpaRepositories
@Configuration
public class SpringConfig {
    private final EntityManager em;

    @Autowired
    public SpringConfig(EntityManager em) {
        this.em = em;
    }



}
