package com.hummingbird.backend.user.dto;

import com.hummingbird.backend.user.domain.Customer;
import com.hummingbird.backend.user.domain.Owner;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class OwnerDto {
    @NotEmpty
    private String name;

    @NotEmpty
    private String token;

    @NotEmpty
    @Email(regexp =  "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$",
            message = "유효 하지 않은 이메일 형식 입니다.")
    private String email;

    @NotEmpty
    @Pattern(regexp = "(?=^.{8,32}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$",
            message = "비밀 번호는 최소 1개의 대소문자, 특수문자, 숫자를 포함한 8자 이상여야 합니다.")
    private String password;



    public Owner toEntity(PasswordEncoder passwordEncoder) {
        return Owner.builder()
                .name(name)
                .token(token)
                .build();
    }
}
