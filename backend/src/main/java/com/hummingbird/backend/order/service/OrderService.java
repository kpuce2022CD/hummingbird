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
import com.hummingbird.backend.shop.domain.Shop;
import com.hummingbird.backend.shop.service.ShopService;
import com.hummingbird.backend.user.domain.Customer;
import com.hummingbird.backend.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserService userService;
    private final ShopService shopService;
    private final FoodService foodService;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, UserService userService, ShopService shopService, FoodServiceImpl foodService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userService = userService;
        this.shopService = shopService;
        this.foodService = foodService;
    }

    /**
     * 주문
     */
    @Transactional
    public OrderCreateResponse order(OrderCreateRequest orderCreateRequest){

        OrderCreateDto orderCreateDto = orderCreateRequest.getOrderInfoDto();

        Customer customerReference = userService.getReferenceById(orderCreateDto.getCustomerId());
        Shop shopReference = shopService.getReferenceById(orderCreateDto.getShopId());
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
