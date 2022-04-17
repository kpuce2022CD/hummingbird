import React from "react";
import { useRecoilValue } from "recoil";

import * as S from "./style";
import { CartItemState } from "../../recoil/states";
import CartItem from "../CartItem";

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
        {CartList.map(({ foodId, foodName, foodPrice, count, fileName }) => (
          <CartItem
            foodId={foodId}
            foodName={foodName}
            foodPrice={foodPrice}
            count={count}
            fileName={fileName}
          />
        ))}
      </S.CartList>
      <S.PaymentBtn>주문하기</S.PaymentBtn>
    </S.Wrapper>
  );
};

export default CartModal;
