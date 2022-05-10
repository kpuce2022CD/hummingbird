import React, { useState } from 'react';
import type { FC } from 'react';
import * as S from './OrderTap.style';

type OrderTapProps = {};

const OrderTap: FC<OrderTapProps> = () => {
  const TabList = ['모두 보기', '주문 미확인', '주문 확인'];
  const [selectedTab, SetSelectedTab] = useState<number>(0);
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
