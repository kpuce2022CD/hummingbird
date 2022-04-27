import React from "react";
import Image from "next/image";

import * as S from "./style";
import { numberFormat } from "../../utils/numberFormat";
import { useRecoilState } from "recoil";
import { CartItemState } from "../../recoil/states";

type Props = {
  foodId: number;
  foodName: string;
  foodPrice: number;
  count: number;
  fileName: string;
};

const CartItem = ({ foodId, foodName, foodPrice, count, fileName }: Props) => {
  const [cartItem, setCartItem] = useRecoilState(CartItemState);
  const CartItemCount = (countNum: number) => {
    setCartItem((cartItem) => {
      return cartItem.map((item) =>
        item.foodId === foodId
          ? {
              foodId: foodId,
              fileName: fileName,
              foodName: foodName,
              foodPrice: foodPrice,
              count:
                item.count + countNum !== 0
                  ? item.count + countNum
                  : item.count,
            }
          : item
      );
    });
  };

  return (
    <S.ItemWrap key={foodId}>
      <Image
        src={`http://localhost:8080/images/${fileName}`}
        alt="음식 사진"
        width="100"
        height="100"
        unoptimized={true}
      />
      <S.ContentWrap>
        <h3>{foodName}</h3>
        <S.FoodPrice>
          <S.PriceText>{numberFormat(foodPrice)} 원</S.PriceText>
          <S.CountBtn>
            <p>
              <button onClick={() => CartItemCount(1)}>+</button>
              {count}
              <button onClick={() => CartItemCount(-1)}>-</button>
            </p>
          </S.CountBtn>
        </S.FoodPrice>
      </S.ContentWrap>
    </S.ItemWrap>
  );
};

export default CartItem;
