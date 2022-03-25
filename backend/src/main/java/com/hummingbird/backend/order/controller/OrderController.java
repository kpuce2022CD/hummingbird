package com.hummingbird.backend.order.controller;

import com.hummingbird.backend.order.domain.Order;
import com.hummingbird.backend.order.dto.request.OrderCreateRequest;
import com.hummingbird.backend.order.dto.response.OrderBillResponse;
import com.hummingbird.backend.order.dto.response.OrderCreateResponse;
import com.hummingbird.backend.order.repository.query.OrderQueryRepository;
import com.hummingbird.backend.order.service.OrderService;
import com.hummingbird.backend.user.dto.CustomerDto;
import org.springframework.data.domain.jaxb.SpringDataJaxb;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;

import static com.hummingbird.backend.order.controller.OrderController.ORDER_API_URI;
import static java.util.stream.Collectors.toList;

@CrossOrigin("*")
@RestController
@RequestMapping(ORDER_API_URI)
public class OrderController {
    public static final String ORDER_API_URI = "/api/orders";

    private final OrderService orderService;
    private final OrderQueryRepository qrderQueryRepository;

    public OrderController(OrderService orderService, OrderQueryRepository qrderQueryRepository) {
        this.orderService = orderService;
        this.qrderQueryRepository = qrderQueryRepository;
    }


    @PostMapping
    public ResponseEntity<OrderCreateResponse> doOrder(@RequestBody OrderCreateRequest orderCreateRequest) {
        OrderCreateResponse orderCreateResponse = orderService.order(orderCreateRequest);

        return ResponseEntity.ok(orderCreateResponse);
    }

    @GetMapping("/bill/{customerId}")
    public OrderBillResponse getBillByCustomerId(
            @PathVariable("customerId") Long customerId,
            @RequestParam(value = "offset", defaultValue = "0") int offset,
            @RequestParam(value = "limit", defaultValue = "10") int limit) {

        return qrderQueryRepository.findOrderBillByCustomerId(offset, limit,customerId);

    }
    @GetMapping("/bill/owner/{shopId}")
    public OrderBillResponse getBillByShopId(
            @PathVariable("shopId") Long shopId,
            @RequestParam(value = "offset", defaultValue = "0") int offset,
            @RequestParam(value = "limit", defaultValue = "10") int limit) {



        return qrderQueryRepository.findOrderBillByShopId(offset, limit, shopId);
    }
}
