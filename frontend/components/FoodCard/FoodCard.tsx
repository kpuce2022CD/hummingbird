import React, { useState } from "react";
import Image from "next/image";

import * as S from "./style";
import MenuModal from "../MenuModal";
type FoodData = {
  content: string;
  fileName: string;
  filePath: string;
  id: number;
  name: string;
  origFileName: string;
  price: number;
};

type Props = {
  foodList: FoodData[];
};

const FoodCard = ({ foodList }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("음식수정");
  const [foodId, setFoodId] = useState(0);
  const handleFoodItem = (foodId: number) => {
    console.log(foodId);
    setFoodId(foodId);
    setModalOpen(true);
  };

  return (
    <S.FoodCardWrap>
      {foodList.map(({ origFileName, fileName, id, name, price, content }) => (
        <S.FoodItem key={id} onClick={() => handleFoodItem(id)}>
          <div className="foodcard-top">
            <Image
              src={`http://localhost:8080/images/${fileName}`}
              alt="음식 사진"
              width="64"
              height="64"
              layout="fixed"
              unoptimized={true}
            />
            <div className="foodcard_top__content">
              <p className="foodcard_top__name">{name}</p>
              <ul className="foodcard_top__list">
                <li>
                  <span>가격</span>
                  {price}
                </li>
                <li>
                  <span>알레르기 정보</span>
                  연어, 토마토
                </li>
              </ul>
            </div>
          </div>
          <div className="foodcard_btm">
            <ul>
              <li>메뉴 소개</li>
              <li>{content}</li>
            </ul>
          </div>
        </S.FoodItem>
      ))}
      {modalOpen && (
        <MenuModal
          setModalOpen={setModalOpen}
          type={modalType}
          foodId={foodId}
        />
      )}
    </S.FoodCardWrap>
  );
};

export default FoodCard;
