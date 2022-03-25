import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { setTimeout } from "timers/promises";

interface IMenuItem {
  name: string;
  price: number;
  content: string;
}
interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuModal = ({ setModalOpen }: Props) => {
  const [inputs, setInputs] = useState<IMenuItem>({
    name: "",
    price: 0,
    content: "",
  });
  const [img, setImg] = useState<File | null>(null);
  const CreateMenu = async (fd: FormData) => {
    try {
      const response = await axios.post("http://localhost:8080/food/new", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
        params: {
          id: 1,
        },
      });
      console.log(response);
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
    console.log(inputs);
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
    fd.append("dto", JSON.stringify(inputs));
    CreateMenu(fd);
  };
  return (
    <ModalWrap>
      <Modal>
        <ModalCloseBtn onClick={() => setModalOpen(false)}>X</ModalCloseBtn>
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
      </Modal>
    </ModalWrap>
  );
};

const ModalWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;
const Modal = styled.div`
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 350px;
  background-color: #fff;
  // Modal 창 브라우저 가운데로 조정
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 10px;
  padding: 20px;

  form {
    width: 100%;
  }

  .file__input {
    display: block;
    width: 100%;
    margin-bottom: 20px;
  }

  .name__input,
  .price__input {
    display: block;
    width: 100%;
    padding: 5px 0px 5px 5px;
    margin-right: 20px;
    border-bottom: 1px solid gray;
    margin-bottom: 20px;
    outline: none;
  }

  .content__input {
    display: block;
    width: 100%;
    padding: 5px;
    border: 1px solid gray;
    border-radius: 10px;
    resize: none;
    outline: none;
  }

  .submit__btn {
    display: block;
    height: 24px;
    width: 100%;
    font-weight: 700;
    border-radius: 10px;
    color: var(--color-orange);
    margin-top: 12px;
  }
`;
const ModalCloseBtn = styled.button`
  width: 100%;
  height: 14px;
  text-align: right;
`;

export default MenuModal;
