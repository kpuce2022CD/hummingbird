import React from "react";
import styled from 'styled-components';

const Info = () => {
  return (
    <div>
        <StyledLine></StyledLine>
        <StyledSection>
            <StyledH1>
                오더캔버스는 무엇인가요?
            </StyledH1>
        </StyledSection>
        <StyledSection>
            <div>
                <img src="" alt="예시 이미지1"/>
                <img src="" alt="예시 이미지2"/>
            </div>

            <div>
                <StyledSubT>간단하게 스마트 메뉴판을 만들어보세요</StyledSubT>
                <StyledH2>쉽고 간단한 메뉴판 만들기</StyledH2>
                <StyledDesc>손님들께 제공할 메뉴판을 만들어보세요.<br/>
                    메뉴 정보만 적어도 오더캔버스가 뚝딱 만들어드립니다.</StyledDesc>
            </div>
        </StyledSection>

        <StyledSection>

            <div>
                <StyledSubT>점원 없이 주문을 받아보세요.</StyledSubT>
                <StyledH2>손님의 주문과 결제를 한번에</StyledH2>
                <StyledDesc>손님의 주문과 결제를 온라인으로 해결해요.<br/>
                    언택트 시대에 걸맞는 메뉴판 서비스를 제공합니다.</StyledDesc>
            </div>
            <div>
                <img src="" alt="예시 이미지3"/>
            </div>
        </StyledSection>

        <StyledSection>
            <div>
                <img src="" alt="주문확인페이지 예시 이미지"/>
            </div>

            <div>
                <StyledSubT>고객의 주문을 간편하게 확인하세요.</StyledSubT>
                <StyledH2>접수된 주문 확인하기</StyledH2>
                <StyledDesc>결제가 된 주문을 오더캔버스의 주문표를 통해 확인하세요.<br/>
                    주문도 결제도 오더캔버스가 함께합니다.</StyledDesc>
            </div>
        </StyledSection>

    </div>
  );
};

const StyledSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5rem;
`;

const StyledLine = styled.div`
    display: flex;
    align-items:center;
    text-align: center;
    border-top:2px solid #E4E4E4;
    width:50%;
    margin: auto;
    margin-top:30px;
`;

const StyledH1 = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 1rem;
`;

const StyledSubT = styled.div`
    font-size: 0.9rem;
    font-weight: bold;
    color: #FA4A0C;
`;
const StyledH2 = styled.h2`
    font-size: 1.3rem;
    font-weight: bold;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`;
const StyledDesc = styled.div`
    color: #737373;
    margin-top: 0.5rem;
`;

export default Info;
