import React from "react";
import * as S from "./style";

type Props = {
  setOpenCartModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartModal = ({ setOpenCartModal }: Props) => {
  return (
    <S.Wrapper>
      <S.Header>
        <h1>장바구니</h1>
        <S.BackIcon onClick={() => setOpenCartModal(false)} />
      </S.Header>
      <S.Notice>
        <S.TouchIcon />
        <p>왼쪽으로 밀어보세요.</p>
      </S.Notice>
      <S.PaymentBtn>주문하기</S.PaymentBtn>
    </S.Wrapper>
  );
};

export default CartModal;
