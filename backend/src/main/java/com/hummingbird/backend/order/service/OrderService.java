package com.hummingbird.backend.order.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonParser;
import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.food.repository.FoodRepository;
import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.order.domain.OrderItem;
import com.hummingbird.backend.order.domain.OrderItemStatus;
import com.hummingbird.backend.order.dto.CartData;
import com.hummingbird.backend.order.dto.OrderItemBillInfo;
import com.hummingbird.backend.order.dto.request.OrderCreateRequest;
import com.hummingbird.backend.order.dto.request.PayCancelRequest;
import com.hummingbird.backend.order.dto.request.PayTockenRequest;
import com.hummingbird.backend.order.dto.request.SalesCreateRequest;
import com.hummingbird.backend.order.dto.response.*;
import com.hummingbird.backend.order.repository.OrderItemRepository;
import com.hummingbird.backend.order.repository.OrderRepository;
import com.hummingbird.backend.owner.domain.Owner;
import com.hummingbird.backend.owner.service.serviceImpl.GeneralOwnerService;
import net.minidev.json.JSONObject;
import netscape.javascript.JSObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Value("${project.properties.imp-key}")
    private String imp_key;

    @Value("${project.properties.imp-secret}")
    private String imp_secret;


    @Autowired
    private final ObjectMapper objectMapper;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final GeneralOwnerService ownerService;
    private final FoodRepository foodRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, GeneralOwnerService ownerService,FoodRepository foodRepository,ObjectMapper objectMapper) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.ownerService = ownerService;
        this.foodRepository = foodRepository;
        this.objectMapper = objectMapper;
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
    public OrderItemCancelResponse cancelOrderItem(Long orderItemId) throws JsonProcessingException {
        OrderItem item = orderItemRepository.findById(orderItemId).orElseThrow();
        item.cancelItem();
        Order order = item.getOrder();
        order.minusPrice(item.getFoodPrice());
        orderRepository.save(order);
        orderItemRepository.save(item);

        System.out.println("status : "+item.getStatus());
        System.out.println("id : "+item.getId());

        //여기서부터 cancelPay - vpay인지 판별하기

        try{
            cancelPay(PayCancelRequest.builder()
                    .reason("사장님 요청")
                    .imp_uid(order.getImpUid())
                    .amount(item.getFoodPrice())
                    .build(),getToken());
        }catch (Exception e){
            e.printStackTrace();
        }




        return OrderItemCancelResponse
                .builder()
                .orderItemId(item.getId())
                .totalPrice(order.getTotalPrice())
                .status(item.getStatus())
                .build();

    }

    //orderRepository에서 order를 찾아서 status를 canceld로 변경
    //orderItemRepository에서 order id로 찾아서 모든 status를 canceled로 변경
    public OrderCancelResponse cancelOrder(Long orderId) throws JsonProcessingException {
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.cancelOrder();
        orderRepository.save(order);

        orderItemRepository.saveAll(orderItemRepository.findAllByOrder(order).stream().map(orderItem -> {
            orderItem.cancelItem();
            return orderItem;
        }).collect(Collectors.toList()));

        //여기서부터 cancelPay - vpay인지 판별하기
        try{
            cancelPay(PayCancelRequest.builder()
                    .imp_uid(order.getImpUid())
                    .reason("사장님 요청")
                    .build(),getToken());
        }catch (Exception e){
            e.printStackTrace();
        }


        return OrderCancelResponse.builder()
                .orderId(order.getOrderId())
                .status(order.getOrderStatus())
                .build();

    }

    public void cancelPay(PayCancelRequest payCancelRequest, String token) throws JsonProcessingException, Exception{ // 환불
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(new MediaType("application","json", Charset.forName("UTF-8")));
        httpHeaders.setBearerAuth(token);

        String param = objectMapper.writeValueAsString(payCancelRequest);
        HttpEntity entity = new HttpEntity(param,httpHeaders);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<JSONObject> responseEntity =  restTemplate.exchange("https://api.iamport.kr/payments/cancel", HttpMethod.POST, entity, JSONObject.class);
        JSONObject body = responseEntity.getBody();
        HashMap<String,String> response = (HashMap<String, String>) body.get("response");
        if(response==null){
            throw new Exception("refund error");
        }


    }

    public void cancelCardPay(String imp_uid){ //전체 환불

    }

//    public void cancelCashPay(int amount,String imp_uid){ //부분 가상계좌 환불
//    }
//
//    public void cancelCashPay(String imp_uid){ //전체 가상계좌 환불
//
//    }

    public String getToken() throws JsonProcessingException {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(new MediaType("application","json", Charset.forName("UTF-8")));

        String param = objectMapper.writeValueAsString(
                PayTockenRequest.builder()
                        .imp_key(imp_key)
                        .imp_secret(imp_secret)
                        .build()
        );

        HttpEntity entity = new HttpEntity(param, httpHeaders);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<JSONObject> responseEntity =  restTemplate.exchange("https://api.iamport.kr/users/getToken", HttpMethod.POST, entity, JSONObject.class);
        JSONObject body = responseEntity.getBody();
        HashMap<String,String> response = (HashMap<String, String>) body.get("response");

        return response.get("access_token");

    }

    public String getMethod(String imp_uid, String token) throws JsonProcessingException {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(new MediaType("application","json", Charset.forName("UTF-8")));
        httpHeaders.setBearerAuth(token);

        HttpEntity entity = new HttpEntity(httpHeaders);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<JSONObject> responseEntity =  restTemplate.exchange("https://api.iamport.kr/payments/"+imp_uid, HttpMethod.GET, entity, JSONObject.class);
        JSONObject body = responseEntity.getBody();
        HashMap<String,String> response = (HashMap<String, String>) body.get("response");

        return response.get("pay_method");

    }
}
