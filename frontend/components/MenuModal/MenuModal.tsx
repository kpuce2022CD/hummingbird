import axios from "axios";
import React, { useState } from "react";
import * as S from "./style";

interface IMenuItem {
  name: string;
  price: string;
  content: string;
}
interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuModal = ({ setModalOpen }: Props) => {
  const [inputs, setInputs] = useState<IMenuItem>({
    name: "",
    price: "0",
    content: "",
  });
  const [img, setImg] = useState<File | null>(null);
  const addNewMenu = async (fd: FormData) => {
    try {
      const response = await axios.post("http://localhost:8080/food/new", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
        params: {
          id: 7,
        },
      });
      console.log(response);
      setModalOpen(false);
    } catch (err) {
      console.log("error", err);
    }
  };

  const handleChange = (
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData();
    if (img !== null) {
      fd.append("file", img);
    }
    const json = JSON.stringify(inputs);
    const blob = new Blob([json], { type: "application/json" });
    fd.append("dto", blob);
    addNewMenu(fd);
  };
  return (
    <S.ModalWrap>
      <S.Modal>
        <S.ModalCloseBtn onClick={() => setModalOpen(false)}>X</S.ModalCloseBtn>
        <form onSubmit={handleSubmit}>
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
            placeholder="메뉴명을 입력해주세요."
            maxLength={20}
            onChange={handleChange}
          />
          <input
            className="price__input"
            name="price"
            placeholder="가격을 입력해주세요."
            maxLength={20}
            onChange={handleChange}
          />
          <textarea
            className="content__input"
            name="content"
            rows={7}
            cols={10}
            maxLength={200}
            placeholder="메뉴 상세를 입력해주세요."
            onChange={handleChange}
          />
          <button className="submit__btn" type="submit">
            제출하기
          </button>
        </form>
      </S.Modal>
    </S.ModalWrap>
  );
};

export default MenuModal;
