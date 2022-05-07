import React, { useState } from 'react';
import * as S from './OrderList.style';
import * as D from '../../../data';
import { useAsync } from '../../../utils/useAsync';
import Item from '../Item.tsx/Item';
import OrderInfoBtn from '../OrderInfoBtn';
const menuHeaderList = [
  '주문 음식 이름',
  '주문 음식 갯수',
  '테이블/주문 시각',
  '주문 상태',
  '결제 정보',
];
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
  return (
    <S.Table>
      <thead>
        <tr>
          {menuHeaderList.map((header, idx) => (
            <th key={idx}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orderInfos.length &&
          orderInfos.map((val, idx) => (
            <tr key={idx}>
              <td>{val.orderItemList.map((val) => val.foodName)}</td>
              <td className="count">
                <Item
                  bgColor={'#f3ecfd'}
                  textColor={'#8a4af3'}
                  content={`${String(
                    val.orderItemList.map((val) => val.count)
                  )} 개`}
                />
              </td>
              <td>{val.orderDate.substr(11, 5)}</td>
              {/* TODO : 주문 승인에 대해서 주문 승인 컴포넌트 넣어줄 예정 */}
              <td>
                {val.orderStatus === 'ACCEPT' ? (
                  <Item
                    bgColor={'#dbefdc'}
                    textColor={'#357a38'}
                    content={`주문 승인`}
                  />
                ) : (
                  <Item
                    bgColor={'#ffeacc'}
                    textColor={'#995b00'}
                    content={`주문 취소`}
                  />
                )}
              </td>
              <td>
                <OrderInfoBtn />
              </td>
            </tr>
          ))}
      </tbody>
    </S.Table>
  );
};

export default OrderList;
