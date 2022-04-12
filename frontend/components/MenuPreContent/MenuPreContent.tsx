import { useRouter } from "next/router";
import React from "react";
import { useRecoilValue } from "recoil";
import Image from "next/image";
import { numberFormat } from "../../utils/numberFormat";
import {
  foodListState,
  tabClickedNameState,
  tabClickedState,
} from "../../recoil/states";
import * as S from "./style";
const MenuPreContent = () => {
  const router = useRouter();
  const categoryName = useRecoilValue(tabClickedNameState);
  const foodList = useRecoilValue(foodListState);
  // id, name, price, content
  console.log(foodList);
  return (
    <S.ContentWrap>
      <S.MenuHeader>
        <S.BackBtn />
        <S.MenuTitle>{router.query.menuName}</S.MenuTitle>
      </S.MenuHeader>
      <S.MenuListContent>
        <S.MenuListTitle>
          <h3>{categoryName}</h3>
        </S.MenuListTitle>
        <S.MenuItemWrap>
          {foodList.map((val, idx) => (
            <S.MenuItem key={idx}>
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
                  <h4>{val.name}</h4>
                </li>
                <li>
                  <p>{numberFormat(val.price)} 원</p>
                </li>
              </ul>
            </S.MenuItem>
          ))}
        </S.MenuItemWrap>
      </S.MenuListContent>
    </S.ContentWrap>
  );
};

export default MenuPreContent;
