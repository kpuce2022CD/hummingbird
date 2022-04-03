import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from 'next/image'
import mypic from '../public/img/foodTable.jpg'
import bannerPic from '../public/img/bannerPic.jpg'
import twoPhone from '../public/img/GroupPhone.jpg'

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
          <StyledImg>
            <Image
              src={twoPhone}
              alt="휴대폰 두개 겹친 이미지"
              width="100%"
              height="100%"
              layout="responsive"
            />
          </StyledImg>
        </ThemeSection>
    </Themediv>
  );
};

const BgImg = styled.img`
  backgorund-image: url("img/foodTable.jpg"); 
  width:100%;
  opacity:0.5;
`;

const StyledBanner = styled.div`
  display: absolute;
`;

const Themediv = styled.div`
    display: flex;
    justify-items: center;
    margin: auto;
    height: 550px;
    padding: 3px;
    background: grey;
    text-align:center;
    color: white;
`;

const ThemeSection = styled.div`
    display: flex-colum;
    margin: auto;
    width:100%;
    height:100%;
    background-image: url('/img/bannerPic.jpg');
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

const StyledImg = styled.div`
    display: span;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin: auto;
    width: 350px;
    height:350px;
`;

export default Banner;
