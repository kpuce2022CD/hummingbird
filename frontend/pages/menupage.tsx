import React, { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Nav from "../components/Nav";
import MenuFormCard from "../components/MenuFormCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuInputCardState } from "../recoil/states";
import MenuList from "../components/MenuList";

const MenuPage: NextPage = () => {
  const router = useRouter();

  const [menuName, setMenuName] = useState<string>();
  const handleChangeMenuName = (event: React.ChangeEvent<HTMLInputElement>) => {
    let menuNameValue = event.target.value;
    setMenuName(menuNameValue);
  };

  // FIXME: 차후 서버와 API 통신이 발생하는 곳
  const handleQr = () => {
    router.push({
      pathname: "/qrpage",
      query: { menuName: menuName },
    });
  };

  return (
    <div>
      <Nav />
      <div className="flex justify-between h-[730px]">
        {/* 좌측 메뉴 수정 */}
        <div className="bg-red-100 w-[40%]">
          <h1>메뉴판명</h1>
          <input
            onChange={handleChangeMenuName}
            placeholder="상호명을 입력해주세요"
          ></input>
          <button className="bg-gray-200" onClick={() => handleQr()}>
            저장(QR로 저장되는 버튼)
          </button>
          <div className="flex bg-yellow-100">
            <div className="bg-orange-100 w-full">
              <div className="flex justify-between">
                <h2 className="inline-block">정보수정창</h2>
                <button className="bg-gray-300">+</button>
              </div>
              <div className="bg-purple-100">메뉴 수정 정보수정창</div>
              <MenuFormCard />
              <MenuList />
            </div>
          </div>
        </div>
        {/* 메뉴판 */}
        <div className="flex bg-blue-100 w-[60%]">
          <div className="m-auto bg-orange-100 w-[414px] h-[618px]">
            식사류
            <MenuList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
