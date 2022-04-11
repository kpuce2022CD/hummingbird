import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import {
  foodListState,
  tabClickedNameState,
  tabClickedState,
} from "../../recoil/states";
import FoodCard from "../FoodCard";
import MenuModal from "../MenuModal";
import * as S from "./style";

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
  const [foodList, setFoodList] = useRecoilState(foodListState);
  const [tabClicked, setTabClicked] = useRecoilState(tabClickedState);
  const [tabClickedName, setTabClickedName] =
    useRecoilState(tabClickedNameState);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuWrapState, setMenuWrapState] = useState("카테고리");
  // 선택된 categoryId를 의미

  const deleteCategory = async (categoryId: number) => {
    try {
      console.log(categoryId);
      const response = await axios.post(
        "http://localhost:8080/category/delete",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          params: {
            categoryId: categoryId,
          },
        }
      );
      console.log(response.data);
      window.location.reload();
    } catch (err) {
      console.log("error", err);
    }
  };

  const getFoodUseCategoryId = async (categoryId: number) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/food/get/category",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          params: {
            categoryId: categoryId,
          },
        }
      );
      setFoodList(response.data);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getFoodUseCategoryId(tabClicked);
  }, [tabClicked]);

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
      case "food_add": {
        setMenuWrapState("음식");
        setModalOpen(true);
        break;
      }
      case "category_delete": {
        deleteCategory(tabClicked);
        break;
      }
      default:
        break;
    }
  };

  return (
    <S.MenuInfoWrap>
      {/* 정보수정 창 */}
      <S.MenuEditWrap>
        {/* 사이드 메뉴가 나오는 부분 */}
        <S.MenuEditSideMenu>
          <div className="menuedit-content__header">
            <button className="menuedit-btn" onClick={() => setModalOpen(true)}>
              카테고리 추가
            </button>
          </div>
          {categoryList.map(({ id, name }, idx) => (
            <S.SideList
              className={`${tabClicked === id ? "tap__active" : "tap"}`}
              key={id}
              onClick={() => HandleSideMenuClick("카테고리", id, name)}
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
