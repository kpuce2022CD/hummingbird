import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuInputCardState } from "../recoil/states";
// 완성된 메뉴판, 손님들이 볼 메뉴판입니다.
const ResultMenu = () => {
  // http://localhost:3000/qrpage?menuName=asd
  // localhost:3000/resultmenu?menuName=asd
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
  const [url, setUrl] = useState<string>("");
  const router = useRouter();

  // FIXME: QR 생성 URL 주소 차후에 배포 후 변경 필요
  useEffect(() => {
    const queryString = String(router.query.menuName);
    setUrl(queryString);
  }, [router.query.menuName]);

  // FIXME: 입력된 카테고리 리스트가 매핑 되어야 한다.
  // 횡스크롤이 가능하여야한다.
  const tabs = ["FOOD", "DRINK", "SNACK"];
  const [tabActiveState, setTabActiveState] = useState(0);
  const clickHandler = (idx: React.SetStateAction<number>) => {
    setTabActiveState(idx);
    const objList = [];
    if (localStorage !== null) {
      for (let i = 1; i < localStorage.length; i++) {
        const key = String(i);
        const obj = JSON.parse(localStorage.getItem(key)!);
        objList.push(obj);
      }
    }
    setMenuList(objList);
  };
  // TODO: FOOD, DRINK, SNACK 세가지에 대해서 작업을 해볼 예정이다.
  // 해당 리스트의 내용이 출력되는 컴포넌트가 각 태그에 들어가야 한다.
  // 카테고리 리스트의 갯수만큼 해당 내용이 출력되어야한다.
  // 기능 구현 후 컴포넌트로 뺄 예정이다.
  // 횡스크롤이 가능하여야한다.

  const contentObj = {
    0: (
      <section>
        <button>더보기</button>
        <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3 scroll-smooth">
          {menuList.map((value, index) => {
            return (
              <>
                <div className="flex-shrink-0 w-[200px] h-[50px] bg-red-100">
                  <span className="block"> 메뉴명 : {value.menu}</span>
                  <span className="block"> 가격 : {value.price}</span>
                </div>
              </>
            );
          })}
        </div>
      </section>
    ),
    1: <p>DRINK</p>,
    2: <p>SNACK</p>,
  };

  const tabList = tabs.map((tab, idx) => (
    <li
      className={`${
        tabActiveState === idx
          ? " bg-purple-700 text-white"
          : "bg-gray-200 text-gray-400"
      } w-1/3 duration-200 ease-in-out font-semibold`}
      key={idx}
      onClick={() => {
        clickHandler(idx);
      }}
    >
      {tab}
    </li>
  ));

  return (
    <div>
      <div className="w-[414px] h-[896px] bg-blue-100">
        <div className="flex justify-between">
          <button>햄버거메뉴</button>
          <button>장바구니 메뉴</button>
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
          <div>{contentObj[tabActiveState]}</div>
        </div>
      </div>
    </div>
  );
};

export default ResultMenu;
