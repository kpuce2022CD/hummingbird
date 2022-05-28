import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import StyledTwoPhone from "./StyledTwoPhone";
import Image from "next/image";
import twoPhone from "../public/img/GroupPhone.svg";

const Banner = () => {
  const router = useRouter();

  return (
    <Themediv>
      <ThemeSection>
        <Subdiv>OrderCanvas 오더 캔버스</Subdiv>
        <StyledH1>
          앱을 다운 로드 받을 필요 없이
          <br /> QR 하나로 주문까지!
        </StyledH1>
        <StyledDesc>지금 바로 스마트 메뉴판을 만들어보세요.</StyledDesc>
        <StyledBtn onClick={() => router.push("/mypage/1")}>
          메뉴만들기
        </StyledBtn>
        <StyledTwoPhone />
      </ThemeSection>
    </Themediv>
  );
};

const Themediv = styled.div`
  display: flex;
  justify-items: center;
  height: 550px;
  text-align: center;
  color: white;
  line-height: 1.5;
`;

const ThemeSection = styled.div`
  display: flex-colum;
  width: 100%;
  height: 100%;
  margin: 0 0 544.9px;
  padding: 0;
  object-fit: contain;
  background-image: url("/img/bannerPic.svg");
  background-size: cover;
`;

const StyledH1 = styled.h1`
  display: block;
  margin: 30px;
  padding: 3px;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const Subdiv = styled.div`
  font-weight: bold;
  margin: 15px;
  margin-top: 100px;
`;

const StyledDesc = styled.div`
  display: block;
  padding: 3px;
  margin: 15px;
`;

const StyledBtn = styled.button`
  padding: 40px;
  padding-top: 15px;
  padding-bottom: 15px;
  background: #fa4a0c;
  border-radius: 25px;
  margin: 30px;
  font-weight: bold;
`;

export default Banner;
