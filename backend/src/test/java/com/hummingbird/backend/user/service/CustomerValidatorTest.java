package com.hummingbird.backend.user.service;

import com.hummingbird.backend.init.DBInit;
import com.hummingbird.backend.user.dto.CustomerDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static com.hummingbird.backend.init.DBInit.Customer_REQUEST_DTO;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class CustomerValidatorTest {

    private Validator validator;
    // https://url.kr/daj4ub
    // 무작성 쓰지 말 것 테스트 코드도 필수로 작성할 것 검증 안 하니까 잘못된 표현 식임을 몰랐음
    @BeforeEach
    void setUp() {
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    @Test
    @DisplayName("사용자가 정상적인 이메일과 패스워드를 입력한 경우 정상적으로 유효성 검사에 통과한다")
    void isCorrectValidation() {

        Set<ConstraintViolation<CustomerDto>> violations = validator.validate(Customer_REQUEST_DTO);
        assertThat(violations).isEmpty();

    }

    @Test
    @DisplayName("사용자의 이메일 형식이 올바르지 않을 경우 유효성 검사에 실패한다.")
    void isNotValidEmail() {
        CustomerDto customerDto = CustomerDto
                .builder()
                .email("qwer1231@navercom")
                .password("zxcv1234~")
                .name("기현")
                .token("기현token")
                .build();

        Set<ConstraintViolation<CustomerDto>> violations = validator.validate(customerDto);
        assertEquals("유효 하지 않은 이메일 형식 입니다.", violations.iterator().next().getMessage());
    }

    @Test
    @DisplayName("사용자의 패스워드 형식이 올바르지 않을 경우 유효성 검사에 실패한다.")
    void isNotValidPassword() {
        CustomerDto customerDto = CustomerDto
                .builder()
                .email("qwer1231@naver.com")
                .password("zxcv1234")
                .name("기현")
                .token("기현token")
                .build();


        Set<ConstraintViolation<CustomerDto>> violations = validator.validate(customerDto);
        assertEquals("비밀 번호는 최소 1개의 대소문자, 특수문자, 숫자를 포함한 8자 이상여야 합니다.",
                violations.iterator().next().getMessage());
    }
}
