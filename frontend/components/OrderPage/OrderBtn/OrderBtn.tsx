import React, { FC } from 'react';
import * as S from './OrderBtn.style';
import styled, { css } from 'styled-components';

type IOrderInfo = {
  onClick?: () => void;
  disabled?: boolean | undefined;
};
const OrderInfo: FC<IOrderInfo> = ({ children, ...rest }) => {
  return <S.StyledButton {...rest}>{children}</S.StyledButton>;
};

export default OrderInfo;
