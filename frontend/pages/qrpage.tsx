import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import styled from "styled-components";
import Nav from "../components/Nav";
import ImageNext from "next/image";

interface qrpageType {
  queryString: string;
  queryStringUrl: string;
}

// QR코드 다운로드 기능
const onImageDownload = () => {
  // FIXME: useRef를 활용하여 돔 객체에 접근하는 방식이 아닌 State로 접근하는 방식으로 차후 구현할 것.
  const svg = document.getElementById("QRCode");
  const svgData = new XMLSerializer().serializeToString(svg!);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx!.drawImage(img, 0, 0);
    const pngFile = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = "QRCode";
    downloadLink.href = `${pngFile}`;
    downloadLink.click();
  };
  img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
};

const QrPage: NextPage = () => {
  const [url, setUrl] = useState<string>("");
  const router = useRouter();
  const string = "string";

  // FIXME: QR 생성 URL 주소 차후에 배포 후 변경 필요
  useEffect(() => {
    const queryString = String(router.query.menuName);
    const queryStringUrl =
      "http://localhost:3000/resultmenu?menuName=" + queryString;
    console.log(queryStringUrl);
    setUrl(queryStringUrl);
  }, [router.query.menuName]);

  return (
    <div>
      <Nav />
      <Theme>
        <LeftSection>
          <div>
            <StyledH1>
              앱을 다운 로드 받을 필요 없이
              <br />
              QR 하나로 주문까지!
            </StyledH1>
            <StyledDesc>
              하단 ‘저장 하기’를 누른 후 매장 내잘 보이는 곳에 부착해주세요.
            </StyledDesc>
            <StyledList>
              <StyledItem>테이블 모서리</StyledItem>
              <StyledItem>테이블 위의 작은 팻말</StyledItem>
              <StyledItem>웨이팅이 있는 매장 입구</StyledItem>
            </StyledList>
            <StyledBtn onClick={() => onImageDownload()}>저장히기</StyledBtn>
          </div>
        </LeftSection>
        <RightSection>
          <SideSection>
            <StyledH2>메뉴 QR 코드</StyledH2>
            <Desc>
              핸드폰 카메라로 스캔하시면
              <br />
              메뉴를 보실 수 있습니다.
            </Desc>
            {/* FIXME: QR 코드 크기에 따른 주황색 border 조정 필요 */}
            <StyledQr>
              {/* FIXME:  영어만 되는 문제점 존재*/}
              <StyledInner>
                <QRCode value={url} id="QRCode" />
              </StyledInner>
            </StyledQr>
          </SideSection>

          <div>아이폰 사진</div>
        </RightSection>
      </Theme>
    </div>
  );
};

const Theme = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
`;

const LeftSection = styled.div`
  display: block;
  flex-grow: 1;
  margin: 3rem;
  background: white;
`;

const SideSection = styled.div`
  border-radius: 20px 0px 0px 20px;
  box-shadow: 10px 10px 40px 0 rgba(0, 0, 0, 0.25);
  background-color: #f6f6f9;
  padding: 1rem;
`;

const RightSection = styled.div`
  display: block;
  flex-grow: 1;
  margin: 3rem;
  background: white;
`;

const StyledH1 = styled.h1`
  display: block;
  margin: 30px;
  padding: 3px;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #fa4a0c;
`;

const StyledH2 = styled.h2`
  display: block;
  padding: 3rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const StyledDesc = styled.div`
  display: block;
  padding: 3px;
  margin: 15px;
  font-weight: 500;
  font-size: 1.2rem;
`;

const Desc = styled.div`
  display: block;
  text-align: center;
  font-weight: 500;
  font-size: 1.5rem;
`;

const StyledList = styled.ul`
  margin: 13px;
`;

const StyledItem = styled.li`
  display: block;
  padding: 3px;
  margin: 15px;
  font-weight: 500;
  font-size: 1.2rem;
`;
const StyledBtn = styled.button`
  padding: 40px;
  padding-top: 15px;
  padding-bottom: 15px;
  background: #fa4a0c;
  border-radius: 25px;
  margin: 30px;
  font-weight: bold;
  color: white;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

const StyledQr = styled.div`
  display: block;
  overflow: hidden;
  width: 300px;
  height: 300px;
  margin: 3rem;
  padding: 5px;
  justify-content: center;
  align-items: center;
  border: 5px solid #fa4a0c;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

const StyledInner = styled.span`
  display: block;
  position: absolute;
  object-fit: cover;
`;

export default QrPage;
