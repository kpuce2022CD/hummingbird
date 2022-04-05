import axios from "axios";
import React, { useState } from "react";
import MenuModal from "../MenuModal";
import * as S from "./style";
type Props = {
  id: number;
  name: string;
};

const MenuCard = ({ id, name }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuWrapState, setMenuWrapState] = useState("");

  const addNewCategory = async (id: number) => {
    console.log(id);
    try {
      const response = await axios.post("http://localhost:8080/menu/delete", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        params: {
          menuId: id,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuDelete = (id: number) => {
    console.log("click!");
    addNewCategory(id);
  };
  return (
    <S.CardWrap>
      <ul>
        <S.CardTitle>
          <h2>{name}</h2>
        </S.CardTitle>
        <S.CardSubTitle>
          <p>
            메뉴판 번호 : <span>{id}</span>
          </p>
        </S.CardSubTitle>
      </ul>
      <S.ButtonWrap>
        <S.QrBtn className="qr">QR 코드 만들기</S.QrBtn>
        <S.DeleteBtn className="edit">메뉴판 수정하기</S.DeleteBtn>
        <S.EditBtn className="delete" onClick={() => handleMenuDelete(id)}>
          메뉴판 삭제하기
        </S.EditBtn>
      </S.ButtonWrap>
      {modalOpen && (
        <MenuModal setModalOpen={setModalOpen} type={menuWrapState} />
      )}
    </S.CardWrap>
  );
};

export default MenuCard;
