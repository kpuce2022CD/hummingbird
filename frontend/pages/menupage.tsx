import React, { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Nav from "../components/Nav";

import styled from "styled-components";

const MenuPage: NextPage = () => {
  interface ICategoryFilterItems {
    menu: string;
    price: string;
    menuInfo: string;
    allergy: string;
    category: string;
  }

  const router = useRouter();
  const handleQr = () => {
    router.push({
      pathname: "/qrpage",
    });
  };

  return (
    <div>
      <Nav />
      <Wrapper>
        <div className="title">title</div>
      </Wrapper>
    </div>
  );
};

export default MenuPage;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  .title {
    color: blue;
  }
`

