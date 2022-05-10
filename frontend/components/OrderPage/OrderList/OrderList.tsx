import React, { FC, useState } from 'react';
import * as S from './OrderList.style';
import * as D from '../../../data';
import { useAsync } from '../../../utils/useAsync';
import Item from '../Item.tsx/Item';
import OrderBtn from '../OrderBtn';
const menuHeaderList = [
  '주문 음식 이름',
  '주문 음식 갯수',
  '테이블 번호',
  '주문 시각',
  '주문 상태',
  '주문 취소',
  '주문 완료',
];
const OrderList: FC = () => {
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
              {/* 주문 음식 이름 */}
              <td>{val.orderItemList.map((val) => val.foodName)}</td>
              {/* 주문 음식 갯수 */}
              <td className="count">
                <Item bgColor={'#f3ecfd'} textColor={'#8a4af3'}>
                  {`${val.orderItemList.map((val) => val.count)} 개`}
                </Item>
              </td>
              {/* FIXME: 테이블 번호 */}
              <td></td>
              <td>{val.orderDate.substr(11, 5)}</td>
              {/* TODO : 주문 승인에 대해서 주문 승인 컴포넌트 넣어줄 예정 */}
              <td>
                {/* TODO: 주문 승인 단어에따른 수정 예정 */}
                {val.orderStatus === 'SEND' ? (
                  <Item bgColor={'#dbefdc'} textColor={'#357a38'}>
                    주문취소
                  </Item>
                ) : (
                  <Item bgColor={'#ffeacc'} textColor={'#995b00'}>
                    주문 승인
                  </Item>
                )}
              </td>
              {/* TODO: 취소를 누를경우 사라짐. */}
              {/* FIXME: 주문 취소 버튼 */}
              <td>
                <OrderBtn
                  disabled={false}
                  onClick={() => console.log('주문취소')}
                >
                  주문 취소
                </OrderBtn>
              </td>
              {/* FIXME: 주문 완료 버튼 */}
              <td>
                <OrderBtn>완료</OrderBtn>
              </td>
            </tr>
          ))}
      </tbody>
    </S.Table>
  );
};

export default OrderList;
