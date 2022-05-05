package com.hummingbird.backend.order.repository.query;

import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.order.dto.OrderInfo;
import com.hummingbird.backend.order.dto.OrderItemInfo;
import com.hummingbird.backend.order.dto.response.OrderBillResponse;
import com.hummingbird.backend.order.service.OrderService;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class OrderQueryRepository {

    private final EntityManager em;
    private final OrderService orderservice;

    public OrderQueryRepository(EntityManager em, OrderService orderservice) {
        this.em = em;
        this.orderservice = orderservice;
    }


    public OrderBillResponse findOrderBillByOwnerId(int offset, int limit, Long ownerId) {

        List<OrderInfo> orderInfoList = findOrdersByOwnerId(ownerId);
        orderInfoList.forEach(orderInfo -> {
            orderInfo.setOrderItemList(findOrderItems(orderInfo.getOrderId()));
        });
        return OrderBillResponse.builder().orderInfoList(orderInfoList).build();
    }

    private List<OrderInfo> findOrdersByOwnerId(Long ownerId) {
        return em.createQuery(
                        "select new com.hummingbird.backend.order.dto.OrderInfo(o.orderId, o.orderStatus, o.orderDate)"
                                +" from Order o"
                                +" join o.owner c"
                                +" where o.owner.id = : ownerId", OrderInfo.class)
                .setParameter("ownerId", ownerId)
                .getResultList();    }

    private List<OrderItemInfo> findOrderItems(Long orderId) {
        return em.createQuery(
                        "select new com.hummingbird.backend.order.dto.OrderItemInfo(f.fileName,f.filePath,f.id, oi.foodPrice, oi.count)" +
                                " from OrderItem oi" +
                                " join oi.food f" +
                                " where oi.order.orderId = : orderId", OrderItemInfo.class)
                .setParameter("orderId", orderId)
                .getResultList();
    }
}
