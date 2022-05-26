import React, { FC, useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import * as S from './OrederDatePicker.style';
import { parseDate } from '../../../utils';
import { getSales } from '../../../data';

type OrderDatePickerProps = {
  ownerId: string | string[];
};
const OrderDatePicker: FC<OrderDatePickerProps> = ({ ownerId }) => {
  const [startDate, setStartDate] = useState(
    `${moment().format('YYYY-MM-DD')} 00:00:00`
  );
  const [endDate, setEndDate] = useState(
    `${moment().format('YYYY-MM-DD')} 23:59:59`
  );
  const [sale, setSale] = useState(0);

  registerLocale('ko', ko);
  useEffect(() => {
    console.log(startDate);
    console.log(endDate);
  }, [startDate, endDate]);

  const handleDateClick = (date: Date, type: string) => {
    if (date) {
      type === 'start'
        ? setStartDate(parseDate(date, type))
        : setEndDate(parseDate(date, type));
    }
  };

  const handleBtnClick = async (
    ownerId: string | string[],
    startDate: string,
    endDate: string
  ) => {
    const result = await getSales(ownerId.toString(), startDate, endDate);
    console.log(result);
  };
  return (
    <>
      <S.Wrap>
        <S.DatePickerWrap>
          <p>시작 일자</p>
          <DatePicker
            selected={new Date()}
            locale="ko"
            onChange={(date: Date) => handleDateClick(date, 'start')}
          />
        </S.DatePickerWrap>
        <S.DatePickerWrap>
          <p>종료 일자</p>
          <DatePicker
            selected={new Date()}
            locale="ko"
            onChange={(date: Date) => handleDateClick(date, 'end')}
          />
        </S.DatePickerWrap>
        <S.Btn onClick={() => handleBtnClick(ownerId, startDate, endDate)}>
          매출 및 주문 조회하기
        </S.Btn>
      </S.Wrap>
    </>
  );
};

export default OrderDatePicker;
