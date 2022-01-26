package com.hummingbird.backend.controller;

import com.hummingbird.backend.dto.OrderDto;
import com.hummingbird.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class OrderController {
//
//    @Autowired
//    private OrderService orderService;

    @GetMapping("/order")
    public Object orderProduct(){
        ArrayList<OrderDto.Product> order = new ArrayList<>();
        OrderDto.Product product1 =new OrderDto.Product(1,3000,2,"아메리카노");
        OrderDto.Product product2 = new OrderDto.Product(2,4500,1,"바닐라라떼");
        order.add(product1);
        order.add(product2);

        return order;
    }



}
