import React from "react";
import { useRouter } from "next/router";
const Banner = () => {
  const router = useRouter();

  return (
    <div className="flex h-[300px] bg-gray-100">
      <div className="flex-col m-auto">
        <span className="block">슬로건1</span>
        <span className="block">슬로건2</span>
        <span className="block">슬로건3</span>
        <button className="bg-red-100" onClick={() => router.push("/menupage")}>
          메뉴만들기
        </button>
      </div>
    </div>
  );
};

export default Banner;
