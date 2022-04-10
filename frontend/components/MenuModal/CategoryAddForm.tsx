import axios from "axios";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { menuIdState } from "../../recoil/states";
import * as S from "./style";

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CategoryAddForm = ({ setModalOpen }: Props) => {
  const menuId = useRecoilValue(menuIdState);
  const [categoryName, setCategoryName] = useState<string>("");

  const addNewCategory = async (
    categoryName: string,
    menuId: string | string[]
  ) => {
    try {
      const data = {
        categoryName: categoryName,
        menuId: menuId,
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
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleCategorySubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (menuId !== undefined) {
      addNewCategory(categoryName, menuId);
    }
  };
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
};

export default CategoryAddForm;
