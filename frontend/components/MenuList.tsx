import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuInputCardState } from "../recoil/states";

const MenuList = () => {
  interface menuPageType {
    menuList: [
      {
        menu: string;
        price: number;
        menuInfo: string;
        allergy: string;
      }
    ];
  }

  const [menuList, setMenuList] = useRecoilState(menuInputCardState);

  const handleDelete = (index: number) => {
    console.log(`${index}`);
    setMenuList([
      ...menuList.filter((menu) => menuList.indexOf(menu) !== index),
    ]);
  };

  const MenuCardList = () => {
    return (
      <ul>
        {menuList.map((item, index) => (
          <div key={index} className="bg-purple-200 m-2">
            {/* TODO: */}
            {item.menu && (
              <button
                className="bg-gray-200"
                onClick={() => handleDelete(index)}
              >
                삭제하기
              </button>
            )}
            <li>{item.menu}</li>
            <li>{item.price}</li>
            <li>{item.menuInfo}</li>
            <li>{item.allergy}</li>
          </div>
        ))}
      </ul>
    );
  };
  return <MenuCardList />;
};

export default MenuList;
