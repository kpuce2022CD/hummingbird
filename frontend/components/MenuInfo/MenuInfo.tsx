import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

import {
  foodListState,
  menuIdState,
  tabClickedNameState,
  tabClickedState,
} from '../../recoil/states';
import FoodCard from '../FoodCard';
import MenuModal from '../MenuModal';
import * as S from './style';
import { getSessionValue } from '../../utils';

type CategoryData = {
  id: number;
  name: string;
};

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
  categoryList: CategoryData[];
};

const MenuInfo = ({ categoryList }: Props) => {
  const menuId = useRecoilValue(menuIdState);
  const [foodList, setFoodList] = useRecoilState(foodListState);
  const [tabClicked, setTabClicked] = useRecoilState(tabClickedState);
  const [tabClickedName, setTabClickedName] =
    useRecoilState(tabClickedNameState);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuWrapState, setMenuWrapState] = useState('카테고리');
  const [ownerId, setOwnerId] = useState('');
  const router = useRouter();
  const deleteCategory = async (categoryId: number) => {
    try {
      console.log(categoryId);
      const response = await axios.get(
        'http://localhost:8080/category/delete/' + categoryId,
        {}
      );
      console.log(response.data);
      window.location.reload();
    } catch (err) {
      console.log('error', err);
    }
  };

  const getFoodUseCategoryId = async (categoryId: number) => {
    try {
      const response = await axios.get(
        'http://localhost:8080/food/get/category/' + categoryId,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
      setFoodList(response.data);
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    getFoodUseCategoryId(tabClicked);
  }, [tabClicked]);

  useEffect(() => {
    const tmpOwnerId = getSessionValue('ownerId');
    if (tmpOwnerId) {
      setOwnerId(tmpOwnerId);
    }
  }, [getSessionValue('ownerId')]);

  const HandleSideMenuClick = (
    type: string,
    categoryId: number,
    categoryName: string
  ) => {
    setMenuWrapState(type);
    if (categoryId === tabClicked) {
      getFoodUseCategoryId(categoryId);
    }
    setTabClicked(categoryId);
    setTabClickedName(categoryName);
  };

  const handleEditContentBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const btnType = e.currentTarget.value;
    switch (btnType) {
      case 'food_add': {
        setMenuWrapState('음식');
        setModalOpen(true);
        break;
      }
      case 'category_delete': {
        deleteCategory(tabClicked);
        break;
      }
      default:
        break;
    }
  };

  const handleMakeQr = () => {
    router.push({
      pathname: '/qrpage',
      query: { menuId: menuId, ownerId: ownerId },
    });
  };

  return (
    <S.MenuInfoWrap>
      {/* 정보수정 창 */}
      <S.MenuEditWrap>
        {/* 사이드 메뉴가 나오는 부분 */}
        <S.MenuEditSideMenu>
          <S.EditHeader>
            <S.MenuEditBtn onClick={handleMakeQr}>QR 코드 보기</S.MenuEditBtn>
            <S.MenuEditBtn onClick={() => setModalOpen(true)}>
              카테고리 추가
            </S.MenuEditBtn>
          </S.EditHeader>
          {categoryList.map(({ id, name }, idx) => (
            <S.SideList
              className={`${tabClicked === id ? 'tap__active' : 'tap'}`}
              key={id}
              onClick={() => HandleSideMenuClick('카테고리', id, name)}
            >
              {/* 이떄 idx와 categoryId는 다릅니다. idx는 ui적 순서만을 나타냅니다. */}
              <p>{idx + 1}</p>
              {name}
            </S.SideList>
          ))}
        </S.MenuEditSideMenu>
        <S.MenuEditContent>
          {tabClicked === 0 ? (
            <div className="menuEdit-notice__wrap">
              <p className="menuEdit-notice">
                카테고리를 추가하거나 카테고리를 클릭해주세요.
              </p>
            </div>
          ) : (
            <div>
              <S.MenuEditContentBtn>
                <button
                  value="food_add"
                  onClick={(e) => handleEditContentBtn(e)}
                >
                  음식추가
                </button>
                <button
                  value="category_delete"
                  onClick={(e) => handleEditContentBtn(e)}
                >
                  카테고리 삭제
                </button>
              </S.MenuEditContentBtn>
              <FoodCard foodList={foodList} />
            </div>
          )}
        </S.MenuEditContent>
      </S.MenuEditWrap>
      {modalOpen && (
        <MenuModal
          setModalOpen={setModalOpen}
          type={menuWrapState}
          categoryId={tabClicked}
        />
      )}
    </S.MenuInfoWrap>
  );
};

export default MenuInfo;
