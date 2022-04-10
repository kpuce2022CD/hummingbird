import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { menuIdState } from "../../recoil/states";
import * as S from "./style";

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuId: string | string[];
};

const MenuUpdateForm = ({ setModalOpen }: Props) => {
  const [menuName, setMenuName] = useState<string>("");
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

  const handleMenuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setMenuName(e.target.value);
  };
  const handleUpdateMenuSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    updateMenu(menuName, menuId);
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
    <S.CateForm onSubmit={handleUpdateMenuSubmit}>
      <input
        onChange={handleMenuChange}
        className="cate__input"
        name="category"
        placeholder="수정할 메뉴판명을 입력해주세요"
      ></input>
      <p>* 메뉴판 이름 수정 시에 입력한 메뉴판 명으로 변경됩니다.</p>
      <p>
        * 해당 메뉴판의 메뉴를 수정하시고 싶으시면 메뉴 구성 수정하기를
        눌러주세요.
      </p>
      <S.ButtonWrap>
        <S.Button>메뉴판 이름 수정하기</S.Button>
        <S.Button onClick={(e) => handleMenuFoodEdit(e)}>
          메뉴 구성 수정하기
        </S.Button>
      </S.ButtonWrap>
    </S.CateForm>
  );
};

export default MenuUpdateForm;
