import React, { useState } from 'react';
import { useAsync } from '../../../utils';
import * as S from './AdminTable.style';
import * as D from '../../../data';
import axios from 'axios';
const headerList = [
  '고객 번호',
  '고객 이름',
  '고객 이메일',
  '사업자 등록번호',
  '회원 삭제',
];

const AdminTable = () => {
  const [ownerInfos, setOwnerInfos] = useState<D.IOwnerInfo[]>([]);

  const [error, resetError] = useAsync(async () => {
    setOwnerInfos([]);
    resetError();

    const fetchOwnerInfos = await D.getOwnerInfo();
    setOwnerInfos(fetchOwnerInfos);
    console.log(ownerInfos);
  }, []);

  const handleDeleteUser = async (ownerId: number) => {
    try {
      axios.delete(`http://localhost:8080/api/owner/${ownerId}`);
      alert('계정 삭제 완료 되었습니다.');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <S.UserInfoWrap>
        <p>누적 가입 고객 수 : {ownerInfos.length} 명 </p>
      </S.UserInfoWrap>
      <S.Table>
        <thead>
          <tr>
            {headerList.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ownerInfos.length > 0 &&
            ownerInfos.map((val, idx) => (
              <tr key={idx}>
                {/* 고객 번호 */}
                <td>{val.ownerId}</td>
                {/* 고객 이름 */}
                <td>{val.userName}</td>
                {/* 고객 이메일 */}
                <td>{val.userEmail}</td>
                {/* 고객 사업자 등록번호 */}
                <td>{val.businessRegistrationNumber}</td>
                {/* 회원 삭제 기능 */}
                <td>
                  <button onClick={() => handleDeleteUser(val.ownerId)}>
                    회원 삭제하기
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </S.Table>
    </>
  );
};

export default AdminTable;
