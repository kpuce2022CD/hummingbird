import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import { numberFormat } from '../../utils/numberFormat';
import {
  foodListState,
  tabClickedNameState,
  tabClickedState,
} from '../../recoil/states';
import * as S from './style';
import FoodMenuItem from '../FoodMenuItem';
const MenuPreContent = () => {
  const router = useRouter();
  const categoryName = useRecoilValue(tabClickedNameState);
  const foodList = useRecoilValue(foodListState);
  // id, name, price, content

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
            <FoodMenuItem
              idx={val.id}
              foodName={val.name}
              foodPrice={val.price}
              fileName={val.fileName}
            />
          ))}
        </S.MenuItemWrap>
      </S.MenuListContent>
    </S.ContentWrap>
  );
};

export default MenuPreContent;
