package com.hummingbird.backend.order.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.hummingbird.backend.order.domain.OrderItem;
import com.hummingbird.backend.order.domain.OrderItemStatus;
import com.hummingbird.backend.order.dto.request.OrderCreateRequest;
import com.hummingbird.backend.order.dto.request.SalesCreateRequest;
import com.hummingbird.backend.order.dto.response.*;
import com.hummingbird.backend.order.repository.query.OrderQueryRepository;
import com.hummingbird.backend.order.service.OrderService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

import static com.hummingbird.backend.order.controller.OrderController.ORDER_API_URI;


@RestController
@RequestMapping(ORDER_API_URI)
public class OrderController {
    public static final String ORDER_API_URI = "/api/orders";

    private final OrderService orderService;
    private final OrderQueryRepository orderQueryRepository;

    @Autowired
    public OrderController(OrderService orderService, OrderQueryRepository orderQueryRepository) {
        this.orderService = orderService;
        this.orderQueryRepository = orderQueryRepository;
    }


    @PostMapping
    public ResponseEntity<OrderCreateResponse> doOrder(@RequestBody OrderCreateRequest orderCreateRequest) {
        OrderCreateResponse orderCreateResponse = orderService.order(orderCreateRequest);

        return ResponseEntity.ok(orderCreateResponse);
    }

    @GetMapping("/bill/{ownerId}")
    public OrderBillResponse getBillByOwnerId(
            @PathVariable("ownerId") Long ownerId,
            @RequestParam(value = "offset", defaultValue = "0") int offset,
            @RequestParam(value = "limit", defaultValue = "10") int limit) {

        return orderQueryRepository.findOrderBillByOwnerId(offset, limit,ownerId);
    }

    @GetMapping("/items/{ownerId}")
    public OrderItemBillResponse getItemsByOwnerId(
            @PathVariable("ownerId") Long ownerId,
            @RequestParam(value = "status",defaultValue = "DOING") String status,
            @RequestParam("start") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime start,
            @RequestParam("end") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")  LocalDateTime end) throws Exception {

        return orderService.getItemsByOrderId(ownerId,status,start,end);
    }

    @PostMapping("/status/{itemId}")
    public OrderItemStatusResponse changeStatus(@PathVariable("itemId")Long itemId) throws Exception{
        return orderService.changeStatus(itemId);
    }
    @GetMapping("/sales/{ownerId}")
    public SalesCreateResponse getSales(@PathVariable("ownerId") Long ownerId,
                                        @RequestParam("start") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime start,
                                        @RequestParam("end") @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")  LocalDateTime end){
        return orderService.getSales(ownerId, start, end);
    }

    @PostMapping("/cancel/order/{orderId}")
    public OrderCancelResponse cancelOrder(@PathVariable("orderId") Long orderId) throws JsonProcessingException {
        //order의 전체 취소
        //order에 포함된 전체 orderItem들도 모두 cancel
        return orderService.cancelOrder(orderId);

    }

    @PostMapping("/cancel/item/{orderItemId}")
    public OrderItemCancelResponse cancelOrderItem(@PathVariable("orderItemId") Long orderItemId) throws JsonProcessingException {
        //order Item 부분 취소
        //order의 totalPrice 변경 (취소한 금액만큼 빼기)
        return orderService.cancelOrderItem(orderItemId);
    }

    @PostMapping("/token")
    public String getToken() throws JsonProcessingException {
        return orderService.getToken();
    }

    @GetMapping("/method")
    public String getMethod(@RequestParam("imp_uid") String imp_uid) throws JsonProcessingException {
        return orderService.getMethod(imp_uid, orderService.getToken());
    }

    @GetMapping("/receipt/{orderId}")
    public JSONObject getReceipt(@PathVariable("orderId") Long orderId) throws JsonProcessingException {
        return orderService.getReceipt(orderId, getToken());

    }




}
