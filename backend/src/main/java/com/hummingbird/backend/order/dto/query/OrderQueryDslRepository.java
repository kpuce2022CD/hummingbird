package com.hummingbird.backend.order.dto.query;

import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.order.dto.OrderSearchCondition;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderQueryDslRepository {
    Page<Order> getAllOrderBillUserIdWithPaging(OrderSearchCondition orderSearchCondition, Pageable pageable);
}
