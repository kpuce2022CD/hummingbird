import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Nav from "../components/Nav";
import MenuFormCard from "../components/MenuFormCard";

const MenuPage: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Nav />
      <div className="flex justify-between h-[730px]">
        {/* 좌측 메뉴 수정 */}
        <div className="bg-red-100 w-[40%]">
          <h1>메뉴판명</h1>
          <input placeholder="상호명을 입력해주세요"></input>
          <button
            className="bg-gray-200"
            onClick={() => router.push("/qrpage")}
          >
            저장
          </button>
          <div className="flex bg-yellow-100">
            <div className="bg-green-100">메뉴선택</div>
            <div className="bg-orange-100 w-full">
              <div className="flex justify-between">
                <h2 className="inline-block">정보수정창</h2>
                <button className="bg-gray-300">+</button>
              </div>
              <div className="bg-purple-100">메뉴 수정 정보수정창</div>
              <MenuFormCard />
              {}
            </div>
          </div>
        </div>
        {/* 메뉴판 */}
        <div className="flex bg-blue-100 w-[60%]">
          <div className="m-auto bg-orange-100 w-[414px] h-[618px]">식사류</div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
