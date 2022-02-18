package com.hummingbird.backend.common.domain;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass // 상속하더라도 컬럼으로 JPA가 인식할 수 있도록하는 설정
@EntityListeners(AuditingEntityListener.class) // Auditing 기능 포함
public abstract class BaseTimeEntity {

    // 생성 시간 자동 저장
    @CreatedDate
    @Column(name = "create_at", nullable = false, updatable = false)
    protected LocalDateTime createdTime;

    // 마지막 수정 시간 자동 저장
    @LastModifiedDate
    @Column(name = "update_at", nullable = false)
    protected LocalDateTime modifiedTime;

}
