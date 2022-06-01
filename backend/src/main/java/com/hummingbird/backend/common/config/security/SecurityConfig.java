package com.hummingbird.backend.common.config.security;

import com.hummingbird.backend.common.config.properties.CorsProperties;
import com.hummingbird.backend.common.config.security.entrypoint.OwnerLoginAuthenticationEntryPoint;
import com.hummingbird.backend.common.config.security.handler.OwnerAccessDeniedHandler;
import com.hummingbird.backend.common.config.security.handler.OwnerAuthenticationFailureHandler;
import com.hummingbird.backend.common.config.security.handler.OwnerAuthenticationSuccessHandler;
import com.hummingbird.backend.common.config.security.provider.OwnerAuthenticationProvider;
import com.hummingbird.backend.common.config.security.service.OwnerDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.util.Arrays;

@Configuration
@EnableWebSecurity // Spring Security를 활성화한다는 의미의 어노테이션
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CorsProperties corsProperties;
    private final OwnerDetailsService ownerDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(OwnerAuthenticationProvider());
    }

    @Bean
    public AuthenticationProvider OwnerAuthenticationProvider() {
        return new OwnerAuthenticationProvider(ownerDetailsService,getPasswordEncoder());
    }

    @Override
    public void configure(WebSecurity web) throws Exception{
        web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());

        // swagger
        web.ignoring().antMatchers(
                "/v2/api-docs", "/configuration/ui", "/swagger-resources",
                "/configuration/security", "/swagger-ui.html/**", "/webjars/**","/swagger/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("UTF-8");
        filter.setForceEncoding(true);
        http.addFilterBefore(filter, CsrfFilter.class);
        http
                    .cors()
                .and()
                    .csrf().disable()
                    .formLogin().disable()
                    .exceptionHandling()
                    .authenticationEntryPoint(new OwnerLoginAuthenticationEntryPoint())
                    .accessDeniedHandler(ownerAccessDeniedHandler())
                .and()
                    .authorizeRequests()
                    .antMatchers("/api/owner/login").permitAll()
                    .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()//cors를 검증 하는 option 함수의 경우 별도의 filter 없이 허용
                    // todo 인증 권한 설정 바꾸기
                    .antMatchers("/**").permitAll();
        http
                    .apply(new OwnerLoginConfigurer<>())
                    .ownerSuccessHandler(authenticationSuccessHandler())
                    .ownerFailureHandler(authenticationFailureHandler())
                    .loginProcessingUrl("/api/owner/login")
                    .setAuthenticationManager(authenticationManagerBean());
    }
    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource(){
        UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();

        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedHeaders(Arrays.asList(corsProperties.getAllowedHeaders().split(",")));
        corsConfiguration.setAllowedMethods(Arrays.asList(corsProperties.getAllowedMethods().split(",")));
        corsConfiguration.setAllowedOrigins(Arrays.asList(corsProperties.getAllowedOrigins().split(",")));
        corsConfiguration.setMaxAge(corsConfiguration.getMaxAge());
        corsConfiguration.setAllowCredentials(true);

        corsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return corsConfigurationSource;
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        return new OwnerAuthenticationProvider(ownerDetailsService,getPasswordEncoder());
    }

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler(){
        return new OwnerAuthenticationSuccessHandler();
    }

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler(){
        return new OwnerAuthenticationFailureHandler();
    }

    @Bean
    public AccessDeniedHandler accessDeniedHandler(){
        return new OwnerAccessDeniedHandler();
    }

    @Bean
    public AccessDeniedHandler ownerAccessDeniedHandler(){
        return new OwnerAccessDeniedHandler();
    }
}

