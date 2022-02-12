import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { menuInputCardState } from "../recoil/states";

const MenuFormCard = () => {
  const [menuValues, setMenuValues] = useState<{
    menu: string;
    price: number;
    menuInfo: string;
  }>({
    menu: "",
    price: 0,
    menuInfo: "",
  });

  const [menuCardValues, setMenuCardValues] =
    useRecoilState(menuInputCardState);

  // 디바운싱 최적화 필요
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMenuValues({ ...menuValues, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMenuCardValues([...menuCardValues, menuValues]);
    console.log(menuCardValues);
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
          type="number"
          onChange={handleChange}
        />
        <input
          name="menuInfo"
          placeholder="메뉴소개"
          value={menuValues.menuInfo}
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
