package com.hummingbird.backend.order.controller;

import com.hummingbird.backend.order.dto.request.OrderCreateRequest;
import com.hummingbird.backend.order.dto.request.SalesCreateRequest;
import com.hummingbird.backend.order.dto.response.OrderBillResponse;
import com.hummingbird.backend.order.dto.response.OrderCreateResponse;
import com.hummingbird.backend.order.dto.response.SalesCreateResponse;
import com.hummingbird.backend.order.repository.query.OrderQueryRepository;
import com.hummingbird.backend.order.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.hummingbird.backend.order.controller.OrderController.ORDER_API_URI;


@RestController
@RequestMapping(ORDER_API_URI)
public class OrderController {
    public static final String ORDER_API_URI = "/api/orders";

    private final OrderService orderService;
    private final OrderQueryRepository orderQueryRepository;

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
    @GetMapping("/sales")
    public SalesCreateResponse getSales(@RequestBody SalesCreateRequest salesCreateRequest){
        return orderService.getSales(salesCreateRequest);
    }
}
