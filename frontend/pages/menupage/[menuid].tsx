import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import Nav from "../../components/Nav";
import MenuModal from "../../components/MenuModal";
import axios from "axios";
import FoodCard from "../../components/FoodCard";

type FoodData = {
  content: string;
  fileName: string;
  filePath: string;
  id: number;
  name: string;
  origFileName: string;
  price: number;
};

type CategoryData = {
  id: number;
  name: string;
};

const MenuPage: NextPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuWrapState, setMenuWrapState] = useState("카테고리");
  // 선택된 categoryId를 의미
  const [tabClicked, setTabClicked] = useState(0);
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);
  const [foodList, setFoodList] = useState<FoodData[]>([]);
  const router = useRouter();
  const { menuid } = router.query;

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

  const getCategoryUseMenuId = async (
    menuid: string | string[] | undefined
  ) => {
    try {
      const response = await axios.get<CategoryData[]>(
        "http://localhost:8080/category/get/menu",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          params: {
            menuId: menuid,
          },
        }
      );
      setCategoryList(response.data);
    } catch (err) {
      console.log("error", err);
    }
  };

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
  useEffect(() => {
    console.log(menuid);
    menuid && getCategoryUseMenuId(menuid);
  }, [menuid]);

  const HandleSideMenuClick = (type: string, categoryId: number) => {
    setMenuWrapState(type);
    setTabClicked(categoryId);
    // getFoodUseCategoryId(tabClicked);
    // console.log(foodList);
  };

  useEffect(() => {
    console.log(tabClicked + "탭임");
    getFoodUseCategoryId(tabClicked);
    console.log(foodList);
  }, [tabClicked]);

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
    <div>
      <Nav />
      <Wrapper>
        <MenuInfoWrap>
          {/* 정보수정 창 */}
          <MenuEditWrap>
            {/* 사이드 메뉴가 나오는 부분 */}
            <MenuEditSideMenu>
              <div className="menuedit-content__header">
                <button
                  className="menuedit-btn"
                  onClick={() => setModalOpen(true)}
                >
                  카테고리 추가
                </button>
              </div>
              {categoryList.map(({ id, name }, idx) => (
                <SideList
                  className={`${tabClicked === id ? "tap__active" : "tap"}`}
                  key={id}
                  onClick={() => HandleSideMenuClick("카테고리", id)}
                >
                  {/* 이떄 idx와 categoryId는 다릅니다. idx는 ui적 순서만을 나타냅니다. */}
                  <p>{idx + 1}</p>
                  {name}
                </SideList>
              ))}
            </MenuEditSideMenu>
            <MenuEditContent>
              {tabClicked === 0 ? (
                <div className="menuEdit-notice__wrap">
                  <p className="menuEdit-notice">
                    카테고리를 추가하거나 카테고리를 클릭해주세요.
                  </p>
                </div>
              ) : (
                <div>
                  <MenuEditContentBtn>
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
                  </MenuEditContentBtn>
                  <FoodCard foodList={foodList} />
                </div>
              )}
            </MenuEditContent>
          </MenuEditWrap>
        </MenuInfoWrap>
        <MenuPre>
          <MenuPreContent></MenuPreContent>
        </MenuPre>
      </Wrapper>
      {modalOpen && (
        <MenuModal
          setModalOpen={setModalOpen}
          type={menuWrapState}
          categoryId={tabClicked}
        />
      )}
    </div>
  );
};

export default MenuPage;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  box-sizing: content-box;
  overflow: hidden;
`;

const MenuInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const MenuEditWrap = styled.div`
  display: flex;
  height: 100vh;
`;

const MenuEditSideMenu = styled.ul`
  background-color: var(--color-mid-gray);
  width: 200px;
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  align-items: left;

  .tap {
    font-weight: 400;
  }
  .tap__active {
    font-weight: 700;
    color: var(--color-orange);
  }
  .menuedit-content__header {
    display: flex;
    justify-content: center;
  }
  .menuedit-btn {
    margin-top: 25px;
    background-color: var(--color-orange);
    padding: 10px;
    color: white;
    border-radius: 25px;
    font-size: 0.9rem;
    line-height: 1.5rem;
    font-weight: 700;
    cursor: pointer;
  }
`;

const SideList = styled.li`
  padding: 20px 0px;
  cursor: pointer;
  :hover {
    font-weight: 700;
  }
  p {
    display: inline-block;
    color: var(--color-orange);
    width: 22px;
    text-align: center;
    padding-top: 2px;
    margin-right: 5px;
    height: 22px;
    border-radius: 50px;
    background-color: #fff;
    border: 1px solid var(--color-orange);
  }
`;

const MenuEditContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0px 0px 10px;
  margin-right: 20px;
  border-top-right-radius: 20px;
  background-color: var(--color-light-gray);
  .menuEdit-notice__wrap {
    display: flex;
    justify-content: center;
  }
  .menuEdit-notice {
    font-size: 1rem;
    padding-top: 200px;
    text-align: center;
    width: 230px;
    color: gray;
  }
`;

const MenuPre = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  padding-top: 55px;
  background-color: var(--color-mid-gray);
`;

const MenuPreContent = styled.div``;

const MenuEditContentBtn = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 5px;

  button {
    padding: 10px 20px;
    border-radius: 25px;
    font-size: 0.9rem;
    line-height: 1.5rem;
    font-weight: 700;
    background-color: #fff;
    color: var(--color-orange);
    border: 1px solid var(--color-orange);

    :hover {
      background-color: var(--color-orange);
      color: #fff;
    }
  }
`;
