import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuInputCardState } from "../recoil/states";
import { count } from "console";
// 완성된 메뉴판, 손님들이 볼 메뉴판입니다.
const ResultMenu = () => {
  interface ICategoryFilterItems {
    menu: string;
    price: string;
    menuInfo: string;
    allergy: string;
    category: string;
  }

  const [menuList, setMenuList] = useRecoilState(menuInputCardState);
  const [tabActiveState, setTabActiveState] = useState<string>();
  const [tabItems, SetTabItems] = useState<string[]>([]);
  const [url, setUrl] = useState<string>("");
  const router = useRouter();
  const [cartList, setCartList] = useState<Object>();

  // FIXME: QR 생성 URL 주소 차후에 배포 후 변경 필요
  useEffect(() => {
    const queryString = String(router.query.menuName);
    setUrl(queryString);
  }, [router.query.menuName]);

  // FIXME: 입력된 카테고리 리스트가 매핑 되어야 한다.
  // 횡스크롤이 가능하여야한다.
  useEffect(() => {
    let tabs: any[] = [];
    console.log("화면 마운트 ");
    for (let i = 1; i < localStorage.length; i++) {
      const tmpObj = JSON.parse(localStorage.getItem(String(i))!);
      tabs.push(tmpObj.category);
    }
    SetTabItems(tabs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickHandler = (categoryName: string) => {
    setTabActiveState(categoryName);
    console.log(tabActiveState);
    const objList = [];
    if (localStorage !== null) {
      for (let i = 1; i < localStorage.length; i++) {
        const key = String(i);
        const obj = JSON.parse(localStorage.getItem(key)!);
        if (obj.category === categoryName) {
          objList.push(obj);
        }
      }
    }
    setMenuList(objList);
    console.log(menuList);
  };

  const handleAddCard = (index: number, menu: string, price: string) => {
    alert("장바구니 담기 완료!");
  };
  // 차후 횡 스크롤 될 수 있도록 변경
  const tabList = tabItems.map((value, index) => (
    <li
      className={`${
        tabActiveState === value
          ? " bg-purple-700 text-white"
          : "bg-gray-200 text-gray-400"
      } w-1/3 duration-200 ease-in-out font-semibold`}
      key={index}
      onClick={() => {
        clickHandler(value);
      }}
    >
      {value}
    </li>
  ));

  return (
    <div>
      <div className="w-[414px] h-[896px] bg-blue-100">
        <div className="flex justify-between">
          <button>햄버거메뉴</button>
          <button onClick={() => router.push("/cart")}>장바구니 메뉴</button>
        </div>
        <div>
          <span>슬로건1</span>
        </div>
        <input placeholder="메뉴 검색" />
        {/* 카탈로그 탭 - 현재는 주문관련해서만 구현 해보기로 */}
        <div>
          <div>
            <div className="flex h-10">
              <ul className="flex w-full bg-gray-200 pl-6">{tabList}</ul>
            </div>
          </div>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3 scroll-smooth">
            {menuList.map((value, index) => {
              return (
                <>
                  <div
                    className="flex-shrink-0 w-[200px] h-[50px] bg-red-100 cursor-pointer"
                    onClick={() =>
                      handleAddCard(index, value.menu, value.price)
                    }
                  >
                    <span className="block"> 메뉴명 : {value.menu}</span>
                    <span className="block"> 가격 : {value.price}</span>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultMenu;
