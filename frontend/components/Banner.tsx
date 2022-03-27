import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";



const Banner = () => {
  const router = useRouter();

  return (
    <Themediv>
        <ThemeSection>
          <Subdiv>OrderCanvas 오더 캔버스</Subdiv>
          <StyledH1>앱을 다운 로드 받을 필요 없이<br/> QR 하나로 주문까지!</StyledH1>
          <StyledDesc>지금 바로 스마트 메뉴판을 만들어보세요.</StyledDesc>
          <StyledBtn onClick={() => router.push("/menupage")}>
            메뉴만들기
          </StyledBtn>
          <div>
            <img src="" alt="휴대폰 두개 겹쳐진 이미지"/>
          </div>
        </ThemeSection>

    </Themediv>
    // <div>
    //   <BgImg></BgImg>
    // </div>
  );
};

const BgImg = styled.div`
  backgorund-image: url("img/foodTable.jpg"); 
  background-repeat: no-repeat;
	background-size: cover;
  width:100px;
  height:100px;
`;

const Themediv = styled.div`
    display: flex;
    margin: auto;
    height: 550px;
    padding: 3px;
    text-align:center;
    background: grey;
    color: white;
`;

const ThemeSection = styled.div`
    display: flex-colum;
    margin: auto;
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
    font-weight:bold;
    margin: 15px;

`;

const StyledDesc= styled.div`
    display: block;
    padding: 3px;
    margin: 15px;
`;

const StyledBtn = styled.button`
    padding: 40px;
    padding-top:15px;
    padding-bottom:15px;    
    background: #FA4A0C;
    border-radius: 25px;
    margin: 30px;
    font-weight: bold;
`;

export default Banner;
