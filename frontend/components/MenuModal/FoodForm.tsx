import axios from "axios";
import React, { useState } from "react";
import * as S from "./style";

type IMenuItem = {
  name: string;
  price: string;
  content: string;
};

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categoryId: number | undefined;
};

const FoodForm = ({ setModalOpen, categoryId }: Props) => {
  const [inputs, setInputs] = useState<IMenuItem>({
    name: "",
    price: "0",
    content: "",
  });
  const [img, setImg] = useState<File | null>(null);

  const addNewFood = async (fd: FormData) => {
    try {
      const response = await axios.post("http://localhost:8080/food/new", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log(response);
      setModalOpen(false);
    } catch (err) {
      console.log("error", err);
    }
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

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImg(e.target.files ? e.target.files[0] : null);
  };

  const handleFoodSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData();
    if (img !== null) {
      fd.append("file", img);
    }
    fd.append("foodName", inputs["name"]);
    fd.append("foodPrice", inputs["price"]);
    fd.append("foodContent", inputs["content"]);
    fd.append("categoryId", String(categoryId));
    addNewFood(fd);
  };
  return (
    <div>
      <form onSubmit={handleFoodSubmit}>
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
        <S.SummitBtn className="submit__btn" type="submit">
          제출하기
        </S.SummitBtn>
      </form>
    </div>
  );
};

export default FoodForm;
