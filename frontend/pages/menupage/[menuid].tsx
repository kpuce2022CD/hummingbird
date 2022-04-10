import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import Nav from "../../components/Nav";
import MenuModal from "../../components/MenuModal";
import axios from "axios";
import MenuInfo from "../../components/MenuInfo";
import { useRecoilState } from "recoil";
import { menuIdState } from "../../recoil/states";

type CategoryData = {
  id: number;
  name: string;
};

const MenuPage: NextPage = () => {
  const [menuId, setMenuId] = useRecoilState(menuIdState);
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);
  const router = useRouter();
  const { menuid } = router.query;

  const getCategoryUseMenuId = async (menuid: string | string[]) => {
    try {
      const response = await axios.get<CategoryData[]>(
        "http://localhost:8080/category/get/menu",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          params: {
            menuId: menuid,
          },
        }
      );
      setCategoryList(response.data);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    if (typeof menuid !== "undefined") {
      console.log(menuid);
      setMenuId(menuid);
    }
  }, [menuid]);

  useEffect(() => {
    getCategoryUseMenuId(menuId);
  }, [menuId]);

  return (
    <div>
      <Nav />
      <Wrapper>
        <MenuInfo categoryList={categoryList} />
        <MenuPre>
          <MenuPreContent></MenuPreContent>
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
  background-color: var(--color-mid-gray);
`;

const MenuPreContent = styled.div``;
