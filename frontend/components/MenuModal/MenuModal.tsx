import React from "react";

import CategoryAddForm from "./CategoryAddForm";
import FoodAddForm from "./FoodAddForm";
import FoodUpdateForm from "./FoodUpdateForm";
import MenuAddForm from "./MenuAddForm";
import MenuUpdateForm from "./MenuUpdateForm";
import * as S from "./style";

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  categoryId?: number | undefined;
  ownerId?: number;
  menuId?: number | undefined;
  foodId?: number | undefined;
}

const MenuModal = ({
  setModalOpen,
  type,
  categoryId,
  menuId,
  foodId,
}: Props) => {
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
                <MenuUpdateForm setModalOpen={setModalOpen} menuId={menuId} />
              );
            case "음식수정":
              return (
                <FoodUpdateForm setModalOpen={setModalOpen} foodId={foodId} />
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
