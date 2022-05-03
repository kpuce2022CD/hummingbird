import React, { useState } from 'react';
import * as S from './OrderList.style';
import * as D from '../../../data';
import { useAsync } from '../../../utils/useAsync';

const OrderList = () => {
  const [orderInfos, setOrderInfos] = useState<D.IOrderInfo[]>([]);
  const [error, resetError] = useAsync(async () => {
    setOrderInfos([]);
    //화면에 보이는 error 문구 제거 함수
    resetError();
    // Error 타입 객체가 reject되는 경우 테스트할 시 주석 제거
    // await Promise.reject(new Error('some error occurs'));
    const fetchOrderInfos = await D.getOrderInfo();
    setOrderInfos(fetchOrderInfos);
  });

  console.log(orderInfos);
  return <div>OrderList</div>;
};

export default OrderList;
