import React, { FC } from 'react';
import QRCode from 'react-qr-code';
import { onImageDownload } from '../../../utils/onImageDownload';
import * as S from './QrList.style';
type IQrListProps = {
  tableNum: number;
  url: string;
};

const QrList: FC<IQrListProps> = ({ tableNum, url }) => {
  console.log(url);
  const arr = Array.from({ length: tableNum }, (notUsed, i) => i + 1);

  return (
    <S.Wrap>
      {/* <QRCode value={url} id="QRCode" /> */}
      {arr.map((val, idx) => (
        <S.ListItem key={val}>
          <div>
            <QRCode id={String(val)} value={`${url}?table=${val}`} />
          </div>
          <div>
            <h1>{val}번 테이블 QR 코드 </h1>
            <div>
              <p>
                <span>&#183;</span> 다운로드 후 저장된 사진을 출력해주세요.
              </p>
              <p>
                <span>&#183;</span> 출력된 QR코드는 매장 내 잘보이는 곳에
                부착해주세요.
              </p>
            </div>
            <button onClick={() => onImageDownload(String(val))}>
              저장 하기
            </button>
          </div>
        </S.ListItem>
      ))}
    </S.Wrap>
  );
};

export default QrList;
