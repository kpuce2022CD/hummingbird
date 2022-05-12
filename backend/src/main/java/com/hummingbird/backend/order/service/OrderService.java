package com.hummingbird.backend.order.service;

import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.food.repository.FoodRepository;
import com.hummingbird.backend.food.service.FoodService;
import com.hummingbird.backend.food.service.serviceImpl.FoodServiceImpl;
import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.order.domain.OrderItem;
import com.hummingbird.backend.order.dto.CartData;
import com.hummingbird.backend.order.dto.request.OrderCreateDto;
import com.hummingbird.backend.order.dto.request.OrderCreateRequest;
import com.hummingbird.backend.order.dto.request.SalesCreateRequest;
import com.hummingbird.backend.order.dto.response.OrderCreateResponse;
import com.hummingbird.backend.order.dto.response.SalesCreateResponse;
import com.hummingbird.backend.order.repository.OrderItemRepository;
import com.hummingbird.backend.order.repository.OrderRepository;
import com.hummingbird.backend.owner.domain.Owner;
import com.hummingbird.backend.owner.service.OwnerService;
import com.hummingbird.backend.owner.service.serviceImpl.GeneralOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final GeneralOwnerService ownerService;
    private final FoodService foodService;
    private final FoodRepository foodRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, GeneralOwnerService ownerService, FoodServiceImpl foodService,FoodRepository foodRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.ownerService = ownerService;
        this.foodService = foodService;
        this.foodRepository = foodRepository;
    }

    /**
     * 주문
     */
    @Transactional
    public OrderCreateResponse order(OrderCreateRequest orderCreateRequest){
        Owner ownerReference = ownerService.getReferenceById(orderCreateRequest.getOwnerId());
        Order newOrder = Order.createOrder(ownerReference,orderCreateRequest.getImpUid(),orderCreateRequest.getTableNumber(),orderCreateRequest.getTotalPrice());
        orderRepository.save(newOrder);

//        List<OrderItem> orderItemList = orderCreateDto
//                .getOrderItemList()
//                .stream()
//                .map(orderItemDtoVal ->
//                        orderItemDtoVal.toEntity(
//                        foodService.getReferenceById(orderItemDtoVal.getFoodId()), newOrder))
//                .collect(Collectors.toList());


//        List<OrderItem> orderItemList = orderCreateRequest.getCartDataList()
//                        .stream()
//                                .map(orderItemDtoVal ->
//                                        orderItemDtoVal.toEntity(foodService.getReferenceById(orderItemDtoVal.getFoodId()),newOrder))
//                                        .collect(Collectors.toList());
        List<CartData> cartDataList = orderCreateRequest.getCartDataList();
        List<OrderItem> orderItemList = new ArrayList<>();
        for(CartData cartData : cartDataList){
            Food food = foodRepository.findById(cartData.getFoodId()).orElseThrow();
            System.out.println(food.getName());

            if(cartData.getCount()>1){
                for(int i=0;i<cartData.getCount();i++){
                    OrderItem item = OrderItem.builder()
                            .order(newOrder)
                            .food(food)
                            .foodPrice(food.getPrice())
                            .build();
                    orderItemRepository.save(item);
                }
            }
            else{
                OrderItem item = OrderItem.builder()
                        .order(newOrder)
                        .food(food)
                        .foodPrice(food.getPrice())
                        .build();
                orderItemRepository.save(item);
            }
        }
        return OrderCreateResponse
                .builder()
                .tableNumber(orderCreateRequest.getTableNumber())
                .orderStatus(newOrder.getOrderStatus())
                .totalPrice(orderCreateRequest.getTotalPrice())
                .build();


    }

    public SalesCreateResponse getSales(SalesCreateRequest salesCreateRequest){
        int sales=0;
        Owner ownerReference = ownerService.getReferenceById(salesCreateRequest.getOwnerId());
        List<Order> orderList = orderRepository.findAllByOrderDateBetweenAndOwner(salesCreateRequest.getStart(),salesCreateRequest.getEnd(),ownerReference);
        for (Order order : orderList) {
            sales+=order.getTotalPrice();
        }

        return SalesCreateResponse.
                builder()
                .sales(sales).
                build();
    }
}
