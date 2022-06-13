import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import * as S from './OrderList.style';
import * as D from '../../../data';
import { useAsync } from '../../../utils/useAsync';
import Item from '../Item.tsx/Item';
import OrderBtn from '../OrderBtn';
import { useRouter } from 'next/router';
import axios from 'axios';
import { constSelector, useRecoilState, useRecoilValue } from 'recoil';
import {
  EndDateState,
  OrderInfoState,
  StartDateState,
  tabClickedState,
} from '../../../recoil/states';
import QRCode from 'react-qr-code';
import QrModal from '../../QrPage/QrModal';
const menuHeaderList = [
  '주문 번호',
  '주문 음식 번호',
  '주문 음식 이름',
  // '주문 음식 갯수',
  '테이블 번호',
  '주문 시각',
  '주문 상태',
  '주문 확인',
  '주문 전체 환불',
  '주문 부분 환불',
];

type OrderListProps = {
  ownerId: string | string[];
};

const OrderList: FC<OrderListProps> = ({ ownerId }) => {
  // FIXME:
  const [orderInfos, setOrderInfos] = useRecoilState(OrderInfoState);
  const tabStatus = useRecoilValue(tabClickedState);
  const startDate = useRecoilValue(StartDateState);
  const endDate = useRecoilValue(EndDateState);
  const router = useRouter();

  const [error, resetError] = useAsync(async () => {
    setOrderInfos([]);
    //화면에 보이는 error 문구 제거 함수
    resetError();
    // Error 타입 객체가 reject되는 경우 테스트할 시 주석 제거
    // await Promise.reject(new Error('some error occurs'));

    const fetchOrderInfos = await D.getOrderInfo(
      String(ownerId),
      tabStatus,
      startDate,
      endDate
    );
    setOrderInfos(fetchOrderInfos);
  }, [ownerId, tabStatus]);

  const handleCheckOrder = async (ownerItemId: number) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/orders/status/${ownerItemId}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelOrder = async (orderId: number) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/orders/cancel/order/${orderId}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      alert('주문 전체 취소 되었습니다.');
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelOrderItem = async (ownerId: number) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/orders/cancel/item/${ownerId}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      alert('주문 부분 취소 되었습니다.');
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

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
        {orderInfos.length > 0 &&
          orderInfos.map((val, idx) => (
            <tr key={idx}>
              {/* 주문 번호 orderId */}
              <td>{val.orderId}</td>
              {/* 주문 음식 번호 ownerId */}
              <td>{val.orderItemId}</td>
              {/* 주문 음식 이름 */}
              <td>{val.foodName}</td>
              {/* 주문 음식 갯수
              <td className="count">
                {val.orderItemList.map((val) => (
                  <div>{val.foodId} 개</div>
                ))}
              </td> */}
              {/* FIXME: 테이블 번호 */}
              <td>{val.tableNum}</td>
              <td>{val.orderDate.substr(11, 5)}</td>
              {/* TODO : 주문 승인에 대해서 주문 승인 컴포넌트 넣어줄 예정 */}
              <td>
                {/* TODO: 주문 승인 단어에따른 수정 예정 */}
                {
                  {
                    DOING: (
                      <Item bgColor={'#dbefdc'} textColor={'#357a38'}>
                        주문 미확인
                      </Item>
                    ),
                    DONE: (
                      <Item bgColor={'#ffeacc'} textColor={'#995b00'}>
                        주문 확인
                      </Item>
                    ),
                    CANCEL: (
                      <Item bgColor={'#ffeacc'} textColor={'#995b00'}>
                        주문 취소
                      </Item>
                    ),
                  }[val.status]
                }
              </td>
              {/* FIXME: 주문 완료 버튼 */}
              <td>
                <OrderBtn
                  onClick={() => handleCheckOrder(val.orderItemId)}
                  // 결제 취소 탭일때 비활성화
                  disabled={tabStatus === 2 ? true : false}
                >
                  {tabStatus === 0 ? '주문 확인하기' : '주문 확인 취소'}
                </OrderBtn>
              </td>
              {/* FIXME: 주문 취소 버튼 */}
              <td>
                <OrderBtn
                  disabled={tabStatus === 2 ? true : false}
                  onClick={() => handleCancelOrder(val.orderId)}
                >
                  주문 전체 취소
                </OrderBtn>
              </td>
              <td>
                <OrderBtn
                  disabled={tabStatus === 2 ? true : false}
                  onClick={() => handleCancelOrderItem(val.orderItemId)}
                >
                  주문 부분 취소
                </OrderBtn>
              </td>
            </tr>
          ))}
      </tbody>
    </S.Table>
  );
};

export default OrderList;
