import axios from "axios";
import React, { useState } from "react";
import * as S from "./style";

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuAddForm = ({ setModalOpen }: Props) => {
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
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const [menuName, setMenuName] = useState<string>("");
  const handleNewMenuSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    addNewMenu(menuName);
  };
  const handleMenuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setMenuName(e.target.value);
  };
  return (
    <div>
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
    </div>
  );
};

export default MenuAddForm;
