import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Nav from "../components/Nav";
import Image from "next/image";

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
      <div className="flex">
        <div className="bg-red-100">
          <div>
            <span>슬로건1</span>
            <span>슬로건2</span>
            <ul>
              <li>리스트1</li>
              <li>리스트2</li>
              <li>리스트3</li>
            </ul>
            <button className="bg-gray-100" onClick={() => onImageDownload()}>
              저장히기
            </button>
          </div>
        </div>
        <div className="flex bg-blue-100">
          <div className="bg-yellow-100">
            <span>메뉴 QR 코드</span>
            <span>subtitle</span>
            <div>
              QRcode
              {/* FIXME:  영어만 되는 문제점 존재*/}
              <div>
                <QRCode value={url} id="QRCode" />
              </div>
            </div>
          </div>
          <div>아이폰 사진</div>
        </div>
      </div>
    </div>
  );
};

export default QrPage;
