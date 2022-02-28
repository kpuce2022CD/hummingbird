import React from "react";
import { useRecoilValue } from "recoil";
import { menuInputCardState } from "../recoil/states";

const MenuList = () => {
  interface menuPageType {
    menuList: [
      {
        menu: string;
        price: number;
        menuInfo: string;
      }
    ];
  }

  const menuList = useRecoilValue(menuInputCardState);

  const MenuCardList = () => {
    return (
      <ul>
        {menuList.map((item, index) => (
          <div className="bg-purple-200 m-2" key={index}>
            {item.menu && <span className="bg-gray-200">삭제하기 x</span>}
            <li key={index}>{item.menu}</li>
            <li key={index}>{item.price}</li>
            <li key={index}>{item.menuInfo}</li>
          </div>
        ))}
      </ul>
    );
  };
  return <MenuCardList />;
};

export default MenuList;
