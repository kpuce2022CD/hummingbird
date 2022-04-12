import React from "react";
import styled from "styled-components";

const FooterBanner = () => {
  return (
    <Themediv>
      <ThemeSection>
        <StyledH1>회원가입을 통해 오더캔버스를 만나보세요!</StyledH1>
        <StyledDesc>로그인 이후 서비스를 이용하실 수 있습니다.</StyledDesc>
        <StyledBtn1>로그인</StyledBtn1>
        <StyledBtn2>회원가입</StyledBtn2>
      </ThemeSection>
    </Themediv>
  );
};

const Themediv = styled.div`
  display: flex;
  justify-items: center;
  padding-top: 5rem;
  height: 550px;
  text-align: center;
  color: white;
`;

const ThemeSection = styled.div`
  display: flex-colum;
  width: 100%;
  height: 100%;
  padding: 10px;
  object-fit: contain;
  background-image: url("/img/FooterBanner.svg");
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

const StyledDesc = styled.div`
  display: block;
  padding: 3px;
  margin: 15px;
`;

const StyledBtn1 = styled.button`
  padding: 40px;
  padding-top: 15px;
  padding-bottom: 15px;
  background: #fa4a0c;
  border-radius: 15px;
  margin: 30px;
  font-weight: bold;
`;

const StyledBtn2 = styled.button`
  padding: 40px;
  margin: 30px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 15px;
  border: 2px solid #fff;
  font-weight: bold;
`;

export default FooterBanner;
