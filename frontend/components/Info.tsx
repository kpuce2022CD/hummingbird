import Image from "next/image";
import React from "react";
import styled from "styled-components";
import easyMenuPhone1 from "../public/img/info/easyMenu.svg";
import easyMenuPhone2 from "../public/img/info/easyMenu2.svg";
import paymentPhone from "../public/img/info/Payment.svg";
import CheckMac from "../public/img/info/checkMac.svg";

const Info = () => {
  return (
    <div>
      <StyledLine></StyledLine>
      <StyledSection>
        <StyledH1>오더캔버스는 무엇인가요?</StyledH1>
      </StyledSection>

      <EasySection>
        <StyledSection>
          <StyledImg>
            <Img>
              <Image
                src={easyMenuPhone1}
                alt="메뉴판 띄운 아이폰 이미지1"
                max-width="300px"
                layout="responsive"
              />
            </Img>
            <Img>
              <Image
                src={easyMenuPhone2}
                alt="메뉴판 띄운 아이폰 이미지1"
                layout="responsive"
              />
            </Img>
          </StyledImg>
          <Contents>
            <StyledSubT>간단하게 스마트 메뉴판을 만들어보세요</StyledSubT>
            <StyledH2>쉽고 간단한 메뉴판 만들기</StyledH2>
            <StyledDesc>
              손님들께 제공할 메뉴판을 만들어보세요.
              <br />
              메뉴 정보만 적어도 오더캔버스가 뚝딱 만들어드립니다.
            </StyledDesc>
          </Contents>
        </StyledSection>

        <StyledSection>
          <Contents>
            <StyledSubT>점원 없이 주문을 받아보세요.</StyledSubT>
            <StyledH2>손님의 주문과 결제를 한번에</StyledH2>
            <StyledDesc>
              손님의 주문과 결제를 온라인으로 해결해요.
              <br />
              언택트 시대에 걸맞는 메뉴판 서비스를 제공합니다.
            </StyledDesc>
          </Contents>
          <StyledImg>
            <Img2>
              <Image
                src={paymentPhone}
                alt="주문하는 아이폰 이미지"
                layout="responsive"
              />
            </Img2>
          </StyledImg>
        </StyledSection>

        <StyledSection>
          <StyledImg>
            <Image
              src={CheckMac}
              alt="주문 확인하는 맥북 페이지"
              layout="responsive"
            />
          </StyledImg>
          <Contents>
            <StyledSubT>고객의 주문을 간편하게 확인하세요.</StyledSubT>
            <StyledH2>접수된 주문 확인하기</StyledH2>
            <StyledDesc>
              결제가 된 주문을 오더캔버스의 주문표를 통해 확인하세요.
              <br />
              주문도 결제도 오더캔버스가 함께합니다.
            </StyledDesc>
          </Contents>
        </StyledSection>
      </EasySection>
    </div>
  );
};

const StyledLine = styled.div`
  display: block;
  align-content: center;
  text-align: center;
  border-top: 2px solid #e4e4e4;
  width: 50%;
  margin: auto;
  margin-top: 300px;
`;

const EasySection = styled.div`
    justify-content: center;
    align-items: center;
    margin:auto;
    line-height:1.5;
`;

const StyledSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  padding: 5rem;
`;

const StyledImg = styled.div`
  display: table;
  table-layout: fixed;
  justify-content: center;
  align-items: center;
  margin: 59px 0 58px;
  padding: 20px;
  width: 50%;
  max-height: 450px;
  object-fit: scale-down;
  overflow: hidden;
`;

const Img = styled.div`
  display: table-cell;
  vertical-align: middle;
  max-width: 320px;
  max-height: 450px;
`;

const Img2 = styled.div`
  vertical-align: middle;
  max-width: 320px;
  max-height: 450px;
`;

const Contents = styled.div`
  margin: auto;
`;

const StyledH1 = styled.h1`
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
`;

const StyledSubT = styled.div`
  display: block;
  font-size: 0.9rem;
  font-weight: bold;
  color: #fa4a0c;
`;
const StyledH2 = styled.h2`
  display: block;
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;
const StyledDesc = styled.div`
  display: block;
  color: #737373;
  margin-top: 0.5rem;
`;

export default Info;
