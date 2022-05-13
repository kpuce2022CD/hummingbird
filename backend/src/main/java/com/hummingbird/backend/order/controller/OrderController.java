package com.hummingbird.backend.order.controller;

import com.hummingbird.backend.order.dto.request.OrderCreateRequest;
import com.hummingbird.backend.order.dto.response.OrderBillResponse;
import com.hummingbird.backend.order.dto.response.OrderCreateResponse;
import com.hummingbird.backend.order.dto.response.OrderItemBillResponse;
import com.hummingbird.backend.order.dto.response.OrderItemStatusResponse;
import com.hummingbird.backend.order.repository.OrderItemRepository;
import com.hummingbird.backend.order.repository.query.OrderQueryRepository;
import com.hummingbird.backend.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/items/{orderId}")
    public OrderItemBillResponse getItemByOrderId(
            @PathVariable("orderId") Long orderId,
            @RequestParam(value = "status", defaultValue = "doing") String status) throws Exception {

        return orderService.getItemsByOrderId(orderId,status);
    }

    @PostMapping("/status/{itemId}")
    public OrderItemStatusResponse changeStatus(@PathVariable("itemId")Long itemId) throws Exception{
        return orderService.changeStatus(itemId);
    }
}
