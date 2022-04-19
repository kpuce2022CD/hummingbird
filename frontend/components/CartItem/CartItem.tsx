import React from "react";
import Image from "next/image";

import * as S from "./style";
import { numberFormat } from "../../utils/numberFormat";

type Props = {
  foodId: number;
  foodName: string;
  foodPrice: number;
  count: number;
  fileName: string;
};

const CartItem = ({ foodId, foodName, foodPrice, count, fileName }: Props) => {
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
              <button>+</button>
              {count}
              <button>-</button>
            </p>
          </S.CountBtn>
        </S.FoodPrice>
      </S.ContentWrap>
    </S.ItemWrap>
  );
};

export default CartItem;
