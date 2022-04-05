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
  type: string;
}

const MenuModal = ({ setModalOpen, type }: Props) => {
  const [inputs, setInputs] = useState<IMenuItem>({
    name: "",
    price: "0",
    content: "",
  });
  const [img, setImg] = useState<File | null>(null);
  const [menuName, setMenuName] = useState<string>("");

  const addNewFood = async (fd: FormData) => {
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

  const addNewCategory = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/categpry/new",
        {
          name: "test category1",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewMenu = async (menuName: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/menu/new",
        {
          name: "test menu1",
        },
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
    const json = JSON.stringify(inputs);
    const blob = new Blob([json], { type: "application/json" });
    fd.append("dto", blob);
    addNewFood(fd);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleCategorySubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    addNewCategory();
  };

  const handleMenuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setMenuName(e.target.value);
  };

  const handleMenuSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    addNewMenu(menuName);
  };

  return (
    <S.ModalWrap>
      <S.Modal>
        <S.ModalCloseBtn onClick={() => setModalOpen(false)}>X</S.ModalCloseBtn>
        {(() => {
          switch (type) {
            case "음식":
              return (
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
                    placeholder="메뉴명을 입력해주세요."
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
              );
            case "카테고리":
              return (
                <S.CateForm onSubmit={handleCategorySubmit}>
                  <input
                    onChange={handleCategoryChange}
                    className="cate__input"
                    name="category"
                    placeholder="카테고리명을 입력해주세요"
                  ></input>
                  <p>* 카테고리를 먼저 저장 한 후 음식을 저장해주세요.</p>
                  <S.SummitBtn className="submit__btn" type="submit">
                    제출하기
                  </S.SummitBtn>
                </S.CateForm>
              );
            case "메뉴판":
              return (
                <S.CateForm onSubmit={handleMenuSubmit}>
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
