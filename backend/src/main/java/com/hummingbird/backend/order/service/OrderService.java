package com.hummingbird.backend.order.service;

import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.food.repository.FoodRepository;
import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.order.domain.OrderItem;
import com.hummingbird.backend.order.domain.OrderItemStatus;
import com.hummingbird.backend.order.dto.CartData;
import com.hummingbird.backend.order.dto.OrderItemBillInfo;
import com.hummingbird.backend.order.dto.request.OrderCreateRequest;
import com.hummingbird.backend.order.dto.request.SalesCreateRequest;
import com.hummingbird.backend.order.dto.response.*;
import com.hummingbird.backend.order.repository.OrderItemRepository;
import com.hummingbird.backend.order.repository.OrderRepository;
import com.hummingbird.backend.owner.domain.Owner;
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
    private final FoodRepository foodRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, GeneralOwnerService ownerService,FoodRepository foodRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.ownerService = ownerService;
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

    public OrderItemBillResponse getItemsByOrderId(Long orderId, String status) throws Exception{
        List<OrderItemBillInfo> itemList = new ArrayList<>();
        Order order = orderRepository.findById(orderId).orElseThrow();
        switch (status){
            case "DONE":
                itemList = orderItemRepository.findAllByStatusAndOrder(OrderItemStatus.DONE, order)
                        .stream()
                        .map(orderItemDtoVal ->
                                orderItemDtoVal.toEntity(order.getTableNum(), order.getOrderDate()))
                        .collect(Collectors.toList());
                break;
            case "DOING":
                itemList = orderItemRepository.findAllByStatusAndOrder(OrderItemStatus.DOING, order)
                        .stream()
                        .map(orderItemDtoVal ->
                                orderItemDtoVal.toEntity(order.getTableNum(), order.getOrderDate()))
                        .collect(Collectors.toList());
                break;

            case "all":
                itemList = orderItemRepository.findAllByOrder(order)
                        .stream()
                        .map(orderItemDtoVal ->
                                orderItemDtoVal.toEntity(order.getTableNum(), order.getOrderDate()))
                        .collect(Collectors.toList());
                break;
            default:
                throw new Exception("status error");

        }

        return OrderItemBillResponse.builder()
                .orderId(orderId)
                .orderItemList(itemList)
                .build();

    }

    public OrderItemStatusResponse changeStatus(Long itemId) throws Exception {
        OrderItem item = orderItemRepository
                .findById(itemId)
                .orElseThrow();

        switch (item.getStatus()) {
            case DOING:
                item.doneItem();
                break;
            case DONE:
               item.doingItem();
                break;
            default:
                throw new Exception("status error");
        }

        orderItemRepository.save(item);
        return OrderItemStatusResponse.builder().status(item.getStatus()).itemId(item.getId()).build();

    }

    public SalesCreateResponse getSales (SalesCreateRequest salesCreateRequest){
        int sales = 0;
        Owner ownerReference = ownerService.getReferenceById(salesCreateRequest.getOwnerId());
        List<Order> orderList = orderRepository.findAllByOrderDateBetweenAndOwner(salesCreateRequest.getStart(), salesCreateRequest.getEnd(), ownerReference);
        for (Order order : orderList) {
            sales += order.getTotalPrice();
        }

        return SalesCreateResponse.
                builder()
                .sales(sales).
                build();
    }

    //orderItemRepository에서 orderItem을 찾아서 status를 canceld로 변경
    //orderRepository에서 order을 찾아서 foodPrice 만큼 빼서 저장
    public OrderItemCancelResponse cancelOrderItem(Long orderItemId) {
        OrderItem item = orderItemRepository.findById(orderItemId).orElseThrow();
        item.cancelItem();
        Order order = item.getOrder();
        order.minusPrice(item.getFoodPrice());
        orderRepository.save(order);
        orderItemRepository.save(item);

        System.out.println("status : "+item.getStatus());
        System.out.println("id : "+item.getId());


        return OrderItemCancelResponse
                .builder()
                .orderItemId(item.getId())
                .totalPrice(order.getTotalPrice())
                .status(item.getStatus())
                .build();

    }

    //orderRepository에서 order를 찾아서 status를 canceld로 변경
    //orderItemRepository에서 order id로 찾아서 모든 status를 canceled로 변경
    public OrderCancelResponse cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.cancelOrder();
        orderRepository.save(order);

        orderItemRepository.saveAll(orderItemRepository.findAllByOrder(order).stream().map(orderItem -> {
            orderItem.cancelItem();
            return orderItem;
        }).collect(Collectors.toList()));

        return OrderCancelResponse.builder()
                .orderId(order.getOrderId())
                .status(order.getOrderStatus())
                .build();

    }
}
