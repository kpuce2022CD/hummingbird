import React, { useState } from 'react';
import type { FC } from 'react';
import * as S from './OrderTap.style';
import { useRecoilState } from 'recoil';
import { tabClickedState } from '../../../recoil/states';

type OrderTapProps = {};

const OrderTap: FC<OrderTapProps> = () => {
  const TabList = ['주문 미확인', '주문 확인', '주문 취소 내역'];
  const [selectedTab, SetSelectedTab] = useRecoilState(tabClickedState);
  return (
    <S.Tab>
      {TabList.map((item, index) => (
        <li
          className={`${selectedTab === index ? 'tap__active' : 'tap'}`}
          onClick={() => SetSelectedTab(index)}
        >
          <p>{item}</p>
        </li>
      ))}
    </S.Tab>
  );
};

export default OrderTap;
