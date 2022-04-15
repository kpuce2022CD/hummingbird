import React, { useEffect } from "react";
import Image from "next/image";

import * as S from "./style";
import { numberFormat } from "../../utils/numberFormat";
import { useRecoilState } from "recoil";
import { CartItemState } from "../../recoil/states";
import { count } from "console";

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
  const handleAddCart = (
    admin: boolean,
    idx: number,
    foodName: string,
    foodPrice: number
  ) => {
    if (!admin) {
      const selectFood = {
        foodId: idx,
        foodName: foodName,
        foodPrice: foodPrice,
        count: 1,
      };
      if (!cartItem.length) {
        setCartItem([selectFood]);
      } else {
        cartItem.map((val, index) => {
          cartItem[index].foodId !== idx
            ? setCartItem([...cartItem, selectFood])
            : setCartItem(
                cartItem.map((item) =>
                  item.foodId === idx
                    ? { ...item, count: item.count + 1 }
                    : item
                )
              );
        });
      }
    }
  };
  useEffect(() => {
    console.log(cartItem);
  }, [cartItem]);

  return (
    <S.MenuItem
      admin={admin}
      key={idx}
      onClick={() => handleAddCart(admin, idx, foodName, foodPrice)}
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
