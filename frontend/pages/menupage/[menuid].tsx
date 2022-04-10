import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";

import Nav from "../../components/Nav";
import MenuModal from "../../components/MenuModal";
import axios from "axios";

type FoodData = {
  name: string;
  price: number;
  content: string;
};

type CategoryData = {
  id: number;
  name: string;
};

type Props = {
  foodGetData: FoodData[];
};

const MenuPage: NextPage<Props> = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuWrapState, setMenuWrapState] = useState("카테고리");
  // 선택된 categoryId를 의미
  const [tabClicked, setTabClicked] = useState(0);
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);
  const router = useRouter();
  const { menuid } = router.query;

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
            categoryId: 1,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    console.log(menuid);
    menuid && getCategoryUseMenuId(menuid);
  }, [menuid]);

  const handleSideMenuClick = (type: string, categoryId: number) => {
    setMenuWrapState(type);
    setTabClicked(categoryId);
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
                  onClick={() => handleSideMenuClick("카테고리", id)}
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
              )}
            </MenuEditContent>
          </MenuEditWrap>
        </MenuInfoWrap>
        <MenuPre>
          <MenuPreContent>
            {/* 메뉴 주문 들어가면 각 페이지별로 나올 부분 */}
          </MenuPreContent>
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

const FoodCardWrap = styled.div`
  margin-top: 20px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const FoodCard = styled.div`
  margin: 11px 16px 30px 16px;
  padding: 15px;
  box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.04);
  background-color: #fff;
  border-radius: 20px;

  .foodcard-top {
    display: flex;
  }
  Image {
  }

  .foodcard_top__content {
    margin-left: 10px;
    flex: 1;
  }

  .foodcard_top__name {
    text-align: center;
    font-size: 17px;
    font-weight: 600;
  }

  .foodcard_top__list {
    margin-left: 10px;
    margin-top: 10px;

    li {
      font-size: 13px;
      margin-left: auto;
      color: gray;
      margin-bottom: 5px;

      :last-child {
        margin: 0;
      }
      span {
        display: inline-block;
        width: 100px;
        color: #000;
      }
    }
  }

  .foodcard_btm {
    margin-top: 10px;
    font-size: 13px;

    li {
      margin-bottom: 5px;
      :last-child {
        color: gray;
        line-height: 16px;
        margin: 0;
      }
    }
  }
`;

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
