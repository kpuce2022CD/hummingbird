package com.hummingbird.backend.user.controller;

import com.hummingbird.backend.user.dto.CustomerDto;
import com.hummingbird.backend.user.service.serviceImpl.GeneralCustomerService;
import com.hummingbird.backend.user.util.SessionUtilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.hummingbird.backend.user.controller.CustomerController.*;

@RestController
@RequestMapping(CUSTOMER_API_URI)
public class CustomerController {

    public static final String CUSTOMER_API_URI = "/api/customer";

    private final GeneralCustomerService customerService;
    private final SessionUtilService sessionUtilService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public CustomerController(GeneralCustomerService customerService, SessionUtilService sessionUtilService, PasswordEncoder passwordEncoder) {
        this.customerService = customerService;
        this.sessionUtilService = sessionUtilService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping
    public ResponseEntity<HttpStatus> signup(@RequestBody @Valid CustomerDto customerDto, BindingResult bindingResult) {

        // 이메일 중복 관련 상태 코드 정리 https://www.notion.so/ce19f003/409-vs-422-dbcfc2dfa3fe492488b37740efdf35a5
        if (bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }

        boolean isDuplicatedCustomer = customerService.isDuplicatedCustomer(customerDto, passwordEncoder);

        if (isDuplicatedCustomer) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        customerService.signup(customerDto,passwordEncoder);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/login")
    public ResponseEntity<HttpStatus> login(@RequestBody @Valid CustomerDto customerDto, BindingResult bindingResult) {

        if (bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).build();
        }

        boolean isValidMember = customerService.isValidCustomer(customerDto, passwordEncoder);

        if (isValidMember) {
            Long customerId =customerService.findCustomerByEmail(customerDto.getEmail()).getId();
            sessionUtilService.setSessionId(customerId);
            return ResponseEntity.status(HttpStatus.OK).build();
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/logout")
    public ResponseEntity<HttpStatus> logout() {
        sessionUtilService.logout();
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
