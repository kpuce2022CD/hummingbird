import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';
import QRCode from 'react-qr-code';
import styled from 'styled-components';
import Nav from '../components/Nav';
import ExViewPhone from '../components/ExViewPhone';
import QrModal from '../components/QrPage/QrModal';
import QrList from '../components/QrPage/QrList';
import { route } from 'next/dist/server/router';

const QrPage: NextPage = () => {
  const [url, setUrl] = useState<string>('');
  const [tableNum, setTableNum] = useState(1);
  const router = useRouter();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  // QR코드 다운로드 기능

  // FIXME: QR 생성 URL 주소 차후에 배포 후 변경 필요
  useEffect(() => {
    const menuId = String(router.query.menuId);
    const ownerId = String(router.query.ownerId);
    const queryStringUrl = `http://34.64.187.105:3000/resultmenu?menuId=${menuId}&ownerId=${ownerId}`;
    setUrl(queryStringUrl);
  }, [router.query.menuId]);

  return (
    <div>
      <Nav />
      <Theme>
        {/* Modal */}
        {isOpenModal && (
          <QrModal onClickToggleModal={onClickToggleModal}>
            <QrList tableNum={tableNum} url={url} />
          </QrModal>
        )}
        <LeftSection>

        <StyledH1>
              앱을 다운 로드 받을 필요 없이
              <br />
              QR 하나로 주문까지!
        </StyledH1>
        <StyledDesc>
              하단 ‘저장’ 버튼을 누른 후 매장 내<MediaBr/>잘 보이는 곳에 부착해주세요.
        </StyledDesc>
        <StyledList>
          <StyledItem>
              <CheckBell />
                <NonDiv>테이블</NonDiv> 모서리
          </StyledItem>
              <StyledItem>
                <CheckBell />
                <NonDiv>테이블 위의 작은</NonDiv> 팻말
              </StyledItem>
          <StyledItem>
                <CheckBell />
                <NonDiv>웨이팅이 있는 매장</NonDiv> 입구
          </StyledItem>
        </StyledList>

          
          <ModalBtnWrapper>
            <input
              type="number"
              placeholder="테이블 갯수"
              min={1}
              max={20}
              onChange={(e) => {
                setTableNum(parseInt(e.target.value));
              }}
            />
            <StyledBtn onClick={onClickToggleModal}>저장</StyledBtn>
          </ModalBtnWrapper>
        </LeftSection>
        <RightSection>
          <SideSection>
            <StyledH2>메뉴 QR 코드</StyledH2>
            <Desc>
              핸드폰 카메라로 스캔하시면
              <br />
              메뉴를 보실 수 있습니다.
            </Desc>
            <Desc2>
              좀 더 큰 화면에서 확인해주세요.
            </Desc2>
            <StyledQr>
              {/* FIXME:  영어만 되는 문제점 존재*/}
              <StyledInner>
                <QRCode value={`${url}&table=1`} id="QRCode" />
              </StyledInner>
            </StyledQr>
          </SideSection>
          <ExViewPhone />
        </RightSection>
      </Theme>
    </div>
  );
};

const Theme = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  line-height: 1.5;
  @media screen and (max-width: 800px){
    display:block;
  }
`;

const MediaBr = styled.br`
display: none;
@media screen and (max-width: 1300px){
  display:block;
}
`

const LeftSection = styled.div`
  display: block;
  flex-grow: 1;
  text-align: left;
  margin: 5rem 3rem 0rem 3rem;
  background: white;
  width: '40%';
`;

const SideSection = styled.div`
  justify-items: center;
  margin: 3rem 5rem 0px 0rem;
  padding: 1rem;
  width: '60%';
  height: 550px;
  border-radius: 20px 0px 0px 20px;
  background-color: #f6f6f9;
  box-shadow: 10px 10px 40px 0 rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 800px){
    border-radius: 20px;
    margin: 0px;
  }
  @media screen and (max-width: 400px){
    width: 200px;
    height: 200px;
  }
`;

const RightSection = styled.div`
  display: flex;
  margin: 3rem;
  position: absolute;
  left: 45%;
  background: white;
  @media screen and (max-width: 800px){
    position: relative;
    justify-items: center;
    left: 3%;
    width: 60%;
  }
`;

const StyledH1 = styled.h1`
  display: block;
  margin: 20px 10px 30px 30px;
  padding: 3px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fa4a0c;
  @media screen and (max-width: 800px){
    display:none;
  }
`;

const StyledH2 = styled.h2`
  display: block;
  padding: 2rem;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
  @media screen and (max-width: 600px){
    font-size:1rem;
    padding:5px;
  }
`;

const StyledDesc = styled.div`
  display: block;
  padding: 3px;
  margin: 20px 10px 30px 30px;
  font-weight: 500;
  font-size: 1.2rem;
  @media screen and (max-width: 800px){
    display:none;
  }
`;

const Desc = styled.div`
  display: block;
  text-align: center;
  font-weight: 500;
  font-size: 1.3rem;
  @media screen and (max-width: 600px){
    font-size:1rem;
  }
  @media screen and (max-width: 300px){
    display:none;
  }
`;

const Desc2 = styled.div`
  display:none;
  @media screen and (max-width: 300px){
    display: block;
    text-align: center;
    font-weight: 500;
    font-size: 1.3rem;
  }
`;
const StyledList = styled.ul`
  margin: 13px;
  @media screen and (max-width: 800px){
    display:1rem;
  }
`;

const StyledItem = styled.li`
  display: flex;
  padding: 3px;
  margin: 15px;
  align-items: center;
  font-weight: 500;
  font-size: 1.2rem;
`;

const NonDiv = styled.div`
@media screen and (max-width: 300px){
  display:none;
}
`

const StyledQr = styled.div`
  display: flex;
  margin: 3rem;
  padding: 130px;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border: 5px solid #fa4a0c;
  overflow: hidden;
  @media screen and (max-width: 300px){
    display:none;
  }
`;

const StyledInner = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  @media screen and (max-width: 300px){
    display:none;
  }
`;

const CheckBell = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  background-image: url('/img/red_bell.svg');
  background-size: cover;
  width: 70px;
  height: 70px;
  @media screen and (max-width: 500px){
    width:30px;
    height:30px;
  }
`;

const ModalBtnWrapper = styled.div`
  input {
    padding:15px 40px 15px 40px;
    border-radius: 25px;
    border: 1px solid lightgray;
    width: 18%;
    outline: none;
    font-weight: bold;
    margin-left : 30px;

    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    @media screen and (max-width: 800px){
      width:90%;
    }
  }
`;

const StyledBtn = styled.button`
  padding:15px 40px 15px 40px;
  background: #fa4a0c;
  border-radius: 25px;
  margin: 30px;
  font-weight: bold;
  width: 18%;
  color: white;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  
  @media screen and (max-width: 800px){
    width:90%;
  }
`;
export default QrPage;
