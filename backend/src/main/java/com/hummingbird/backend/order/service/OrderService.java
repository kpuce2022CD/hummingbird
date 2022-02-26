package com.hummingbird.backend.order.service;

import com.hummingbird.backend.food.service.serviceImpl.FoodServiceImpl;
import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.order.domain.OrderItem;
import com.hummingbird.backend.order.dto.request.OrderCreateDto;
import com.hummingbird.backend.order.dto.request.OrderCreateRequest;
import com.hummingbird.backend.order.dto.response.OrderCreateResponse;
import com.hummingbird.backend.order.repository.OrderItemRepository;
import com.hummingbird.backend.order.repository.OrderRepository;
import com.hummingbird.backend.shop.domain.Shop;
import com.hummingbird.backend.shop.service.impl.GeneralShopService;
import com.hummingbird.backend.user.domain.Customer;
import com.hummingbird.backend.user.service.serviceImpl.GeneralCustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final GeneralShopService generalShopService;
    private final OrderItemRepository orderItemRepository;
    private final GeneralCustomerService generalCustomerService;
    private final FoodServiceImpl foodService;

    @Autowired
    public OrderService(OrderRepository orderRepository, GeneralShopService generalShopService, OrderItemRepository orderItemRepository, GeneralCustomerService generalCustomerService, FoodServiceImpl foodService) {
        this.orderRepository = orderRepository;
        this.generalShopService = generalShopService;
        this.orderItemRepository = orderItemRepository;
        this.generalCustomerService = generalCustomerService;
        this.foodService = foodService;
    }


    /**
     * 주문
     */
    @Transactional
    public OrderCreateResponse order(OrderCreateRequest orderCreateRequest){

        OrderCreateDto orderCreateDto = orderCreateRequest.getOrderInfoDto();

        Customer customerReference = generalCustomerService.getReferenceById(orderCreateDto.getCustomerId());
        Shop shopReference = generalShopService.getReferenceById(orderCreateDto.getShopId());
        Order newOrder = Order.createOrder(customerReference,shopReference);
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
