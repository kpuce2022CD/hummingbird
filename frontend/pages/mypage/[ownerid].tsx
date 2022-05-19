import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useRecoilState } from 'recoil';

import Nav from '../../components/Nav';
import MyMenuList from '../../components/MyPage/MyMenuList/MyMenuList';
import { ownerIdState } from '../../recoil/states';
import MyPageSideMenu from '../../components/MyPage/MyPageSideMenu';

type Menu = {
  id: number;
  name: string;
};

const MyPage: NextPage = () => {
  const [ownerId, setOwnerId] = useRecoilState(ownerIdState);
  const [menuList, setMenuList] = useState<Menu[] | undefined>();
  const [adminContent, setAdminContent] = useState('menu');
  const router = useRouter();
  const { ownerid } = router.query;

  useEffect(() => {
    if (typeof ownerid !== 'undefined') {
      setOwnerId(Number(ownerid));
    }
  }, [ownerid]);

  useEffect(() => {
    ownerId !== 0 && getMenuUseOwnerId(ownerId);
  }, [ownerId]);

  const getMenuUseOwnerId = async (ownerid: number) => {
    try {
      const response = await axios.get<Menu[]>(
        'http://localhost:8080/menu/get/owner/' + ownerid,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
      setMenuList(response.data);
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <>
      <Nav />
      <MyPageWrap>
        <MyPageSideMenu setAdminContent={setAdminContent} />
        <AdminContentWrap>
          {(() => {
            switch (adminContent) {
              case 'profile':
                return <div>회원정보</div>;
              case 'menu':
                return <MyMenuList menuList={menuList} />;
              default:
                return null;
            }
          })()}
        </AdminContentWrap>
      </MyPageWrap>
    </>
  );
};

export default MyPage;

const MyPageWrap = styled.div`
  background-color: var(--color-light-gray);
  height: 100vh;
  display: flex;
`;

const AdminContentWrap = styled.div`
  padding: 20px;
  flex: 1;
`;
