import React from "react";
import { useRouter } from "next/router";
const Banner = () => {
  const router = useRouter();

  return (
    <div className="flex h-[300px] bg-gray-100">
      <div className="flex-col m-auto">
        <span className="block p-3 ">OrderCanvas 오더 캔버스</span>
        <span className="block p-3 ">
          앱을 다운 로드 받을 필요 없이<br></br> QR 하나로 주문까지!
        </span>
        <span className="block p-3 ">
          지금 바로 스마트 메뉴판을 만들어보세요.
        </span>
        <button
          className="bg-red-100 p-3 rounded-xl"
          onClick={() => {
            router.push({
              pathname: "/mypage/[ownerid]",
              query: { ownerid: 1 },
            });
          }}
        >
          메뉴만들기
        </button>
      </div>
    </div>
  );
};

export default Banner;
