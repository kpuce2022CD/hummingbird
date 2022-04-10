import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { menuIdState } from "../../recoil/states";
import CategoryAddForm from "./CategoryAddForm";
import FoodAddForm from "./FoodAddForm";
import MenuAddForm from "./MenuAddForm";
import * as S from "./style";

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  categoryId?: number | undefined;
}

const MenuModal = ({ setModalOpen, type, categoryId }: Props) => {
  const menuId = useRecoilValue(menuIdState);
  const router = useRouter();

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

  return (
    <S.ModalWrap>
      <S.Modal>
        <S.ModalCloseBtn onClick={() => setModalOpen(false)}>X</S.ModalCloseBtn>
        {(() => {
          switch (type) {
            // 음식 추가
            case "음식":
              return (
                <FoodAddForm
                  setModalOpen={setModalOpen}
                  categoryId={categoryId}
                />
              );
            // 카테고리 추가
            case "카테고리":
              return <CategoryAddForm setModalOpen={setModalOpen} />;
            // 메뉴판 추가
            case "메뉴판":
              return <MenuAddForm setModalOpen={setModalOpen} />;
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
