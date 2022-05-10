import React, { FC } from 'react';
import QRCode from 'react-qr-code';
import { onImageDownload } from '../../../utils/onImageDownload';

type IQrListProps = {
  tableNum: number;
  url: string;
};

const QrList: FC<IQrListProps> = ({ tableNum, url }) => {
  console.log(url);

  const renderQr = () => {
    const result = [];
    for (let i = 1; i <= tableNum; i++) {
      result.push(
        <div>
          <span>{i}번 테이블 QR코드 </span>
          <QRCode value={`${url}?table=${i}`} />
        </div>
      );
    }
    return result;
  };

  return (
    <div>
      {/* <QRCode value={url} id="QRCode" /> */}
      {renderQr()}
    </div>
  );
};

export default QrList;
