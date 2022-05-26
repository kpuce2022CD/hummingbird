import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav';
import OrderDatePicker from '../../components/OrderPage/OrderDatePicker';
import OrderList from '../../components/OrderPage/OrderList';
import OrderTap from '../../components/OrderPage/OrderTap';

const OrderPage: NextPage = () => {
  const [ownerId, setOwnerId] = useState<string | string[]>([]);
  const router = useRouter();
  useEffect(() => {
    setOwnerId(router.query.ownerid || []);
  }, [router.query.ownerid]);

  return (
    <div>
      <Nav />
      <OrderTap />
      <OrderDatePicker ownerId={ownerId} />
      <OrderList ownerId={ownerId} />
    </div>
  );
};

export default OrderPage;
