import React, { FC, useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import * as S from './OrederDatePicker.style';
import { parseDate } from '../../../utils';
import { getSales, ISales } from '../../../data';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  EndDateState,
  OrderInfoState,
  StartDateState,
  tabClickedState,
} from '../../../recoil/states';
import * as D from '../../../data';
type OrderDatePickerProps = {
  ownerId: string | string[];
};
const OrderDatePicker: FC<OrderDatePickerProps> = ({ ownerId }) => {
  const tabStatus = useRecoilValue(tabClickedState);
  const [startDate, setStartDate] = useRecoilState(StartDateState);
  const [endDate, setEndDate] = useRecoilState(EndDateState);
  const [sale, setSale] = useState<ISales>();
  const [notUsed, setOrderInfos] = useRecoilState(OrderInfoState);

  registerLocale('ko', ko);

  const handleDateClick = (date: Date, type: string) => {
    if (date) {
      type === 'start'
        ? setStartDate(parseDate(date, type))
        : setEndDate(parseDate(date, type));
    }
    alert('날짜 설정되었습니다');
  };

  const handleBtnClick = async (
    ownerId: string | string[],
    startDate: string,
    endDate: string
  ) => {
    const result = await getSales(ownerId.toString(), startDate, endDate);
    console.log(result);
    if (typeof result !== 'undefined') {
      setSale(result);

      const fetchOrderInfos = await D.getOrderInfo(
        String(ownerId),
        tabStatus,
        startDate,
        endDate
      );
      setOrderInfos(fetchOrderInfos);
    }
  };

  return (
    <>
      <S.Wrap>
        <S.DatePickerWrap>
          <p>시작 일자</p>
          <DatePicker
            placeholderText="매출 시작일"
            locale="ko"
            onChange={(date: Date) => handleDateClick(date, 'start')}
          />
        </S.DatePickerWrap>
        <S.DatePickerWrap>
          <p>종료 일자</p>
          <DatePicker
            placeholderText="매출 종료일"
            locale="ko"
            onChange={(date: Date) => handleDateClick(date, 'end')}
          />
        </S.DatePickerWrap>
        <S.Sales>
          <p>총 매출 : {sale?.sales} 원</p>
        </S.Sales>
        <S.Btn onClick={() => handleBtnClick(ownerId, startDate, endDate)}>
          매출 및 주문 조회하기
        </S.Btn>
      </S.Wrap>
    </>
  );
};

export default OrderDatePicker;
