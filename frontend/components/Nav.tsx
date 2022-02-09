import Head from "next/head";
import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="flex justify-between h-[100px] shadow-lg">
      <ul className="flex">
        <li>
          <Link href={"/"}>로고</Link>
        </li>
        <li>
          <Link href={"/"}>홈</Link>
        </li>
        <li>
          <Link href={"/"}>소개</Link>
        </li>
        <li>
          <Link href={"/"}>마이페이지</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
