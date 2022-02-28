package com.hummingbird.backend.order.dto.query;

import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.order.dto.OrderSearchCondition;
import com.hummingbird.backend.order.dto.response.OrderBillResponse;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public class OrderQueryDslRepositoryImpl implements OrderQueryDslRepository{

    private final JPAQueryFactory jpaQueryFactory;


    public OrderQueryDslRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }


    @Override
    public Page<Order> getAllOrderBillUserIdWithPaging(
            OrderSearchCondition orderSearchCondition,
            Pageable pageable)
    {
        if (orderSearchCondition.isSearchByShop()) {
            return searchByShopId(orderSearchCondition.getShopId(), pageable);
        }

        if (orderSearchCondition.isSearchByCustomer()) {
            return searchByCustomerId(orderSearchCondition.getCustomerId(), pageable);
        }
        return null;
    }

    private Page<Order> searchByShopId(Long shopId, Pageable pageable) {
//        QueryResults<OrderBillResponse> results = jpaQueryFactory.select(
//                Projections.fields())
//                .from()
        return null;
    }

    private Page<Order> searchByCustomerId(Long customerId, Pageable pageable) {
        return null;
    }
}
