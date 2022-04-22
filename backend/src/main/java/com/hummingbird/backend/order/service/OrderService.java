package com.hummingbird.backend.order.service;

import com.hummingbird.backend.food.service.FoodService;
import com.hummingbird.backend.food.service.serviceImpl.FoodServiceImpl;
import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.order.domain.OrderItem;
import com.hummingbird.backend.order.dto.request.OrderCreateDto;
import com.hummingbird.backend.order.dto.request.OrderCreateRequest;
import com.hummingbird.backend.order.dto.response.OrderCreateResponse;
import com.hummingbird.backend.order.repository.OrderItemRepository;
import com.hummingbird.backend.order.repository.OrderRepository;
import com.hummingbird.backend.owner.domain.Owner;
import com.hummingbird.backend.owner.service.OwnerService;
import com.hummingbird.backend.owner.service.serviceImpl.GeneralOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final GeneralOwnerService ownerService;
    private final FoodService foodService;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, GeneralOwnerService ownerService, FoodServiceImpl foodService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.ownerService = ownerService;
        this.foodService = foodService;
    }

    /**
     * 주문
     */
    @Transactional
    public OrderCreateResponse order(OrderCreateRequest orderCreateRequest){
        OrderCreateDto orderCreateDto = orderCreateRequest.getOrderInfoDto();
        Owner ownerReference = ownerService.getReferenceById(orderCreateDto.getOwnerId());
        Order newOrder = Order.createOrder(ownerReference,orderCreateRequest.getImpUid(),orderCreateRequest.getTableNumber());
        orderRepository.save(newOrder);

        List<OrderItem> orderItemList = orderCreateDto
                .getOrderItemList()
                .stream()
                .map(orderItemDtoVal ->
                        orderItemDtoVal.toEntity(
                        foodService.getReferenceById(orderItemDtoVal.getFoodId()), newOrder))
                .collect(Collectors.toList());

       orderItemRepository.saveAll(orderItemList);

        return OrderCreateResponse
                .builder()
                .tableNumber(orderCreateRequest.getTableNumber())
                .orderStatus(newOrder.getOrderStatus())
                .build();
    }
}
