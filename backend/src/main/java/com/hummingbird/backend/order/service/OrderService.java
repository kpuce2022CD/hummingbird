package com.hummingbird.backend.order.service;

import com.hummingbird.backend.food.domain.Food;
import com.hummingbird.backend.food.repository.FoodRepository;
import com.hummingbird.backend.order.repository.OrderRepository;
import com.hummingbird.backend.user.domain.Customer;
import com.hummingbird.backend.user.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final FoodRepository foodRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, CustomerRepository customerRepository, FoodRepository foodRepository) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.foodRepository = foodRepository;
    }

    /**
     * 주문
     */
    @Transactional
    public Long order(Long customerId, Long foodId, int count){

        Customer customer = customerRepository.findCustomerById(customerId).orElseThrow(NullPointerException::new);
        Food food = foodRepository.getFoodById(foodId).orElseThrow(NullPointerException::new);

        return Long.valueOf(0);
    }
}
