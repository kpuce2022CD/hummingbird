import React, { useCallback, useState } from "react";
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
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
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

  const deleteCartItem = () => {
    setCartItem((cartItem) => {
      return cartItem.filter((item) => item.foodId !== foodId);
    });
  };

  return (
    <S.ItemWrap key={foodId}>
      <Image
        src={`http://34.64.187.105:8080/images/${fileName}`}
        alt="음식 사진"
        width="100"
        height="100"
        layout="fixed"
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
        <button onClick={() => setDropDownOpen(!dropDownOpen)}>
          <S.MoreBtn />
        </button>
        {dropDownOpen && (
          <S.Dropdown>
            <ul>
              <li>찜 목록 추가하기</li>
              <li onClick={deleteCartItem}>삭제하기</li>
            </ul>
          </S.Dropdown>
        )}
      </S.ContentWrap>
    </S.ItemWrap>
  );
};

export default CartItem;
