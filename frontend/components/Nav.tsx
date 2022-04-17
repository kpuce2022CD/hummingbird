import Head from "next/head";
import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="flex justify-between h-[100px] items-center">
      <div className="pl-8">
        <img src="../img/logo.svg"
        width="100px"
        height="100%"/>
      </div>
      <ul className="flex p-3 font-bold">
        <li className="p-3 m-9 hover:text-red-500">
          <Link href={"/"}>홈</Link>
        </li>
        <li className="p-3 m-9 hover:text-red-500">
          <Link href={"/"}>소개</Link>
        </li>
        <li className="p-3 m-9 hover:text-red-500">
          <Link href={"/"}>마이페이지</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
