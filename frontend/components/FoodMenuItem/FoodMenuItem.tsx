import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import * as S from "./style";
import { numberFormat } from "../../utils/numberFormat";
import { useRecoilState } from "recoil";
import { CartItemState } from "../../recoil/states";

type Props = {
  fileName: string;
  idx: number;
  foodName: string;
  foodPrice: number;
  admin?: boolean;
};

const FoodMenuItem = ({
  fileName,
  idx,
  foodName,
  foodPrice,
  admin = true,
}: Props) => {
  const [cartItem, setCartItem] = useRecoilState(CartItemState);

  const addToCart = useCallback(
    (id: number, foodName: string, foodPrice: number, fileName: string) => {
      setCartItem((cartItem) => {
        const find = cartItem.find((item) => item.foodId === id);
        if (typeof find === "undefined") {
          return [
            ...cartItem,
            {
              foodId: id,
              fileName: fileName,
              foodName: foodName,
              foodPrice: foodPrice,
              count: 1,
            },
          ];
        } else {
          return cartItem.map((item) =>
            item.foodId === id
              ? {
                  foodId: id,
                  fileName: fileName,
                  foodName: foodName,
                  foodPrice: foodPrice,
                  count: item.count + 1,
                }
              : item
          );
        }
      });
    },
    []
  );

  const handleAddCart = (
    admin: boolean,
    idx: number,
    foodName: string,
    foodPrice: number,
    fileName: string
  ) => {
    if (!admin) {
      addToCart(idx, foodName, foodPrice, fileName);
    }
  };
  return (
    <S.MenuItem
      admin={admin}
      key={idx}
      onClick={() => handleAddCart(admin, idx, foodName, foodPrice, fileName)}
    >
      <ul>
        <li>
          <Image
            src={`http://localhost:8080/images/${fileName}`}
            alt="음식 사진"
            width="128"
            height="128"
            unoptimized={true}
          />
        </li>
        <li>
          <h4>{foodName}</h4>
        </li>
        <li>
          <p>{numberFormat(foodPrice)} 원</p>
        </li>
      </ul>
    </S.MenuItem>
  );
};

export default FoodMenuItem;
