import React, { useState, useEffect } from "react";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useRecoilState } from "recoil";

import Nav from "../../components/Nav";
import MenuInfo from "../../components/MenuInfo";
import { menuIdState } from "../../recoil/states";
import MenuPreContent from "../../components/MenuPreContent";

type CategoryData = {
  id: number;
  name: string;
};

const MenuPage: NextPage = () => {
  const [menuId, setMenuId] = useRecoilState(menuIdState);
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);
  const router = useRouter();
  const { menuid } = router.query;

  useEffect(() => {
    if (typeof menuid !== "undefined") {
      console.log(menuid);
      setMenuId(menuid);
    }
  }, [menuid]);

  useEffect(() => {
    menuId !== "" && getCategoryUseMenuId(menuId);
  }, [menuId]);

  const getCategoryUseMenuId = async (menuid: string | string[]) => {
    try {
      const response = await axios.get<CategoryData[]>(
        "http://localhost:8080/category/get/menu/"+menuid,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          }
        }
      );
      setCategoryList(response.data);
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div>
      <Nav />
      <Wrapper>
        <MenuInfo categoryList={categoryList} />
        <MenuPre>
          <MenuPreContent />
        </MenuPre>
      </Wrapper>
    </div>
  );
};

export default MenuPage;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  box-sizing: content-box;
  overflow: hidden;
`;

const MenuPre = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  padding-top: 55px;
  background-color: var(--color-light-gray);
`;
