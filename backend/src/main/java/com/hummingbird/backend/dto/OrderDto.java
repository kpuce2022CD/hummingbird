package com.hummingbird.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

public class OrderDto {

    @Getter
    @Setter
    public static class Product{
        public Product(int productNum, int price, int count, String productName) {
            this.productNum = productNum;
            this.price = price;
            this.count = count;
            this.productName = productName;
        }

        private int productNum;
        private int price;
        private int count;
        private String productName;

    }
}
