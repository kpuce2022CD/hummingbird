import React from "react";
import Image from "next/image";

import * as S from "./style";
type FoodData = {
  content: string;
  fileName: string;
  filePath: string;
  id: number;
  name: string;
  origFileName: string;
  price: number;
};

interface Props {
  foodList: FoodData[];
}

const FoodCard = ({ foodList }: Props) => {
  return (
    <S.FoodCardWrap>
      {foodList.map((val, idx) => (
        <S.FoodItem key={idx}>
          <div className="foodcard-top">
            <Image
              src="/images/image2.png"
              alt="음식 사진"
              width="64"
              height="64"
            />
            <div className="foodcard_top__content">
              <p className="foodcard_top__name">{val.name}</p>
              <ul className="foodcard_top__list">
                <li>
                  <span>가격</span>
                  {val.price}
                </li>
                <li>
                  {/* <span>알레르기 정보</span>
              연어, 토마토 */}
                </li>
              </ul>
            </div>
          </div>
          <div className="foodcard_btm">
            <ul>
              <li>메뉴 소개</li>
              <li>{val.content}</li>
            </ul>
          </div>
        </S.FoodItem>
      ))}
    </S.FoodCardWrap>
  );
};

export default FoodCard;
