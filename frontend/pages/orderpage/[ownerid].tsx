import { NextPage } from 'next';
import React from 'react';
import Nav from '../../components/Nav';
import OrderList from '../../components/OrderPage/OrderList';
import OrderTap from '../../components/OrderPage/OrderTap';

const OrderPage: NextPage = () => {
  return (
    <div>
      <Nav />
      <OrderTap />
      <OrderList />
    </div>
  );
};

export default OrderPage;
