import axios from "axios";
import React, { useState } from "react";

import * as S from "./style";

type Food = {
  name: string;
  price: string;
  content: string;
};

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  foodId: number | undefined;
};

const FoodUpdateForm = ({ setModalOpen, foodId }: Props) => {
  const [inputs, setInputs] = useState<Food>({
    name: "",
    price: "0",
    content: "",
  });
  const [img, setImg] = useState<File | null>(null);

  const updateFood = async (fd: FormData, foodId: number) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/food/update",
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
          params: {
            foodId: foodId,
          },
        }
      );
      console.log(response);
      setModalOpen(false);
    } catch (err) {
      console.log("error", err);
    }
  };

  const deleteFood = async (foodId: number) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/food/delete/"+foodId,
        {}
      );
      console.log(response);
      setModalOpen(false);
      window.location.reload();
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleFoodDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    foodId: number | undefined
  ) => {
    e.preventDefault();

    typeof foodId !== "undefined" && deleteFood(foodId);
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImg(e.target.files ? e.target.files[0] : null);
  };

  const handleFoodChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleFoodSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    foodId: number | undefined
  ) => {
    e.preventDefault();
    const fd = new FormData();
    if (img !== null) {
      fd.append("file", img);
    }
    fd.append("foodName", inputs["name"]);
    fd.append("foodPrice", inputs["price"]);
    fd.append("foodContent", inputs["content"]);
    typeof foodId !== "undefined" && updateFood(fd, foodId);
  };

  return (
    <div>
      <form onSubmit={(e) => handleFoodSubmit(e, foodId)}>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/png, image/jpeg"
          className="file__input"
          onChange={handleImgChange}
        />
        <input
          className="name__input"
          name="name"
          placeholder="음식 이름을 입력해주세요."
          maxLength={20}
          onChange={handleFoodChange}
        />
        <input
          className="price__input"
          name="price"
          placeholder="가격을 입력해주세요."
          maxLength={20}
          onChange={handleFoodChange}
        />
        <textarea
          className="content__input"
          name="content"
          rows={7}
          cols={10}
          maxLength={200}
          placeholder="메뉴 상세를 입력해주세요."
          onChange={handleFoodChange}
        />
        <S.ButtonWrap>
          <S.Button>음식 정보 수정하기</S.Button>
          <S.Button onClick={(e) => handleFoodDelete(e, foodId)}>
            음식 삭제하기
          </S.Button>
        </S.ButtonWrap>
      </form>
    </div>
  );
};

export default FoodUpdateForm;
