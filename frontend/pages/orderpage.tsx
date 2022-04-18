import { NextPage } from "next";
import React from "react";
import Payment from "../components/Payment";

const OrderPage: NextPage = () => {
  const orderDto = {
    "tableNumber": 1,
    "orderInfoDto": {
      "impUid":"",
      "ownerId": 1,
      "orderItemList": [
        { "foodId" : 1, "orderPrice" : 10000, "count":2},
        {"foodId":2,orderPrice: 20000,"count":1}
      ]
    }
  }
  
  return (
      <Payment price={100} orderDto={orderDto}></Payment>
  )
};

export default OrderPage;
