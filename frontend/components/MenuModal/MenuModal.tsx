import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FoodForm from "./FoodForm";
import * as S from "./style";

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  menuId?: number | undefined;
  categoryId?: number | undefined;
}

const MenuModal = ({ setModalOpen, type, menuId, categoryId }: Props) => {
  const [menuName, setMenuName] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");
  const router = useRouter();

  const addNewMenu = async (menuName: string) => {
    try {
      const data = {
        menuName: menuName,
        ownerId: "1",
      };
      const response = await axios.post(
        "http://localhost:8080/menu/new",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(response);
      setModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateMenu = async (updateName: string, menuId: string | undefined) => {
    try {
      const data = {
        updateName: updateName,
        menuId: menuId,
      };
      const response = await axios.post(
        "http://localhost:8080/menu/update",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(response);
      setModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMenuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setMenuName(e.target.value);
  };

  const handleNewMenuSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    addNewMenu(menuName);
  };

  const handleUpdateMenuSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    // updateMenu(menuName, menuId);
  };

  const handleMenuFoodEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    router.push({
      pathname: "/menupage",
      query: {
        menuId: menuId,
      },
    });
  };

  const addNewCategory = async (categroyName: string) => {
    try {
      const data = {
        categoryName: categroyName,
        menuId: "1",
      };
      const response = await axios.post(
        "http://localhost:8080/category/new",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(response);
      setModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleCategorySubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    addNewCategory(categoryName);
  };

  return (
    <S.ModalWrap>
      <S.Modal>
        <S.ModalCloseBtn onClick={() => setModalOpen(false)}>X</S.ModalCloseBtn>
        {(() => {
          switch (type) {
            case "음식":
              return (
                <FoodForm setModalOpen={setModalOpen} categoryId={categoryId} />
              );
            case "카테고리":
              return (
                <S.CateForm onSubmit={handleCategorySubmit}>
                  <input
                    onChange={handleCategoryChange}
                    className="cate__input"
                    name="categoryName"
                    placeholder="카테고리명을 입력해주세요"
                  ></input>
                  <p>* 카테고리를 먼저 저장 한 후 음식을 저장해주세요.</p>
                  <S.SummitBtn className="submit__btn" type="submit">
                    제출하기
                  </S.SummitBtn>
                </S.CateForm>
              );
            case "메뉴판":
              return (
                <S.CateForm onSubmit={handleNewMenuSubmit}>
                  <input
                    onChange={handleMenuChange}
                    className="cate__input"
                    name="category"
                    placeholder="메뉴판명을 입력해주세요"
                  ></input>
                  <S.SummitBtn className="submit__btn" type="submit">
                    제출하기
                  </S.SummitBtn>
                </S.CateForm>
              );
            case "메뉴판수정":
              return (
                <S.CateForm onSubmit={handleUpdateMenuSubmit}>
                  <input
                    onChange={handleMenuChange}
                    className="cate__input"
                    name="category"
                    placeholder="수정할 메뉴판명을 입력해주세요"
                  ></input>
                  <p>
                    * 메뉴판 이름 수정 시에 입력한 메뉴판 명으로 변경됩니다.
                  </p>
                  <p>
                    * 해당 메뉴판의 메뉴를 수정하시고 싶으시면 메뉴 구성
                    수정하기를 눌러주세요.
                  </p>
                  <S.ButtonWrap>
                    <S.Button>메뉴판 이름 수정하기</S.Button>
                    <S.Button onClick={(e) => handleMenuFoodEdit(e)}>
                      메뉴 구성 수정하기
                    </S.Button>
                  </S.ButtonWrap>
                </S.CateForm>
              );
            default:
              return null;
          }
        })()}
      </S.Modal>
    </S.ModalWrap>
  );
};

export default MenuModal;
