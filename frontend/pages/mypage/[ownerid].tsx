import React, { useState } from "react";
import styled from "styled-components";
import type { NextPage } from "next";

import Nav from "../../components/Nav";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
const MyPage: NextPage = () => {
  const [adminContent, setAdminContent] = useState("menu");

  return (
    <>
      <Nav />
      <MyPageWrap>
        <SideList>
          <SideItem>
            <li>
              <h2>사장님 정보</h2>
            </li>
            <li>
              <p onClick={() => setAdminContent("profile")}>회원정보</p>
            </li>
            <li>
              <p onClick={() => setAdminContent("menu")}>메뉴판</p>
            </li>
          </SideItem>
        </SideList>
        <AdminContentWrap>
          {(() => {
            switch (adminContent) {
              case "profile":
                return <div>회원정보</div>;
              case "menu":
                return <AdminMenu />;
              default:
                return null;
            }
          })()}
        </AdminContentWrap>
      </MyPageWrap>
    </>
  );
};

const MyPageWrap = styled.div`
  background-color: var(--color-light-gray);
  height: 100vh;
  display: flex;
`;

const SideList = styled.div`
  padding: 20px;
  width: 15%;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 5px 0px 3px 0px;
`;
export default MyPage;

const SideItem = styled.ol`
  h2 {
    font-weight: 700;
    font-size: 1.5rem;
    margin-bottom: 12px;
  }
  p {
    font-size: 1.125rem;
    line-height: 1.125rem;
    margin-bottom: 12px;
    cursor: pointer;
  }
`;

const AdminContentWrap = styled.div`
  padding: 20px;
  flex: 1;
`;
