import React from "react";
import { useRecoilValue } from "recoil";
import { CartItemState } from "../../recoil/states";
import * as S from "./style";

type Props = {
  setOpenCartModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartModal = ({ setOpenCartModal }: Props) => {
  const CartList = useRecoilValue(CartItemState);
  return (
    <S.Wrapper>
      <S.Header>
        <h1>장바구니</h1>
        <S.BackIcon onClick={() => setOpenCartModal(false)} />
      </S.Header>

      <S.CartList>
        <S.Notice>
          <S.TouchIcon />
          <p>왼쪽으로 밀어보세요.</p>
        </S.Notice>
        {CartList.map(({ foodId, foodName, foodPrice, count }) => (
          <div>
            <li>{foodName}</li>
            <li>{foodPrice}</li>
            <li>{count}</li>
          </div>
        ))}
      </S.CartList>
      <S.PaymentBtn>주문하기</S.PaymentBtn>
    </S.Wrapper>
  );
};

export default CartModal;
