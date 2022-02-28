import Head from "next/head";
import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="flex justify-between h-[100px] shadow-lg items-center">
      <div className="pl-8">
          <Link href={"/"}>로고</Link>
        </div>
      <ul className="flex p-3 font-bold">
        <li className="p-3 hover:text-red-500">
          <Link href={"/"}>홈</Link>
        </li>
        <li className="p-3 hover:text-red-500">
          <Link href={"/"}>소개</Link>
        </li>
        <li className="p-3 hover:text-red-500">
          <Link href={"/"}>마이페이지</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
