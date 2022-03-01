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


    public OrderBillResponse findOrderBillByCustomerId(int offset, int limit, Long customerId) {

        List<OrderInfo> orderInfoList =  findOrdersByCustomerId(customerId);

        orderInfoList.forEach(orderInfo -> {
            orderInfo.setOrderItemList(findOrderItems(orderInfo.getOrderId()));
        });
        return OrderBillResponse.builder().orderInfoList(orderInfoList).build();
    }



    public OrderBillResponse findOrderBillByShopId(int offset, int limit, Long shopId) {

        List<OrderInfo> orderInfoList = findOrdersByShopId(shopId);
        orderInfoList.forEach(orderInfo -> {
            orderInfo.setOrderItemList(findOrderItems(orderInfo.getOrderId()));
        });
        return OrderBillResponse.builder().orderInfoList(orderInfoList).build();
    }

    private List<OrderInfo> findOrdersByCustomerId(Long customerId) {
        return em.createQuery(
                "select new com.hummingbird.backend.order.dto.OrderInfo(o.orderId, o.orderStatus, o.orderDate, s.name)"
                +" from Order o"
                +" join o.shop s"
                +" where o.customer.id = : customerId", OrderInfo.class)
                .setParameter("customerId", customerId)
                .getResultList();
    }

    private List<OrderInfo> findOrdersByShopId(Long shopId) {
        return em.createQuery(
                        "select new com.hummingbird.backend.order.dto.OrderInfo(o.orderId, o.orderStatus, o.orderDate, c.id)"
                                +" from Order o"
                                +" join o.shop s"
                                +" join o.shop c"
                                +" where o.shop.id = : shopId", OrderInfo.class)
                .setParameter("shopId", shopId)
                .getResultList();    }

    private List<OrderItemInfo> findOrderItems(Long orderId) {
        return em.createQuery(
                        "select new com.hummingbird.backend.order.dto.OrderItemInfo(f.name, f.price, oi.orderPrice, oi.count)" +
                                " from OrderItem oi" +
                                " join oi.food f" +
                                " where oi.order.orderId = : orderId", OrderItemInfo.class)
                .setParameter("orderId", orderId)
                .getResultList();
    }
}
