import { NextPage } from "next";
import React from "react";
import Nav from "../components/Nav";

const QrPage: NextPage = () => {
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
            <button className="bg-gray-100">자장히기</button>
          </div>
        </div>
        <div className="flex bg-blue-100">
          <div className="bg-yellow-100">
            <span>메뉴 QR 코드</span>
            <span>subtitle</span>
            <div>QRcode</div>
          </div>
          <div>아이폰 사진</div>
        </div>
      </div>
    </div>
  );
};

export default QrPage;
