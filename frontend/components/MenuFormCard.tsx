import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { menuInputCardState } from "../recoil/states";

const MenuFormCard = () => {
  interface IMenuValue {
    menu: string;
    price: string;
    menuInfo: string;
    allergy: string;
    category: string;
  }

  const [menuValues, setMenuValues] = useState<IMenuValue>({
    menu: "",
    price: "",
    menuInfo: "",
    allergy: "",
    category: "",
  });

  const [menuCardValues, setMenuCardValues] =
    useRecoilState(menuInputCardState);

  // 디바운싱 최적화 필요
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value !== null) {
      setMenuValues({ ...menuValues, [name]: value });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMenuCardValues([...menuCardValues, menuValues]);
    setMenuValues({
      menu: "",
      price: "",
      menuInfo: "",
      allergy: "",
      category: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="menu"
          placeholder="메뉴명"
          value={menuValues.menu}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="가격"
          value={menuValues.price}
          onChange={handleChange}
        />
        <input
          name="menuInfo"
          placeholder="메뉴소개"
          value={menuValues.menuInfo}
          onChange={handleChange}
        />
        <input
          name="allergy"
          placeholder="알러지 정보"
          value={menuValues.allergy}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="카테고리"
          value={menuValues.category}
          onChange={handleChange}
        />
        <button className="bg-gray-200" type="submit">
          저장
        </button>
      </form>
    </div>
  );
};

export default MenuFormCard;
