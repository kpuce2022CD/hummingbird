import React from "react";
import Image from "next/image";

import * as S from "./style";
import { numberFormat } from "../../utils/numberFormat";

type Props = {
  idx: number;
  foodName: string;
  foodPrice: number;
  admin?: boolean;
};

const FoodMenuItem = ({ idx, foodName, foodPrice, admin = true }: Props) => {
  return (
    <S.MenuItem admin={admin} key={idx}>
      <ul>
        <li>
          <Image
            src="/images/image2.png"
            alt="음식 사진"
            width="128"
            height="128"
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
