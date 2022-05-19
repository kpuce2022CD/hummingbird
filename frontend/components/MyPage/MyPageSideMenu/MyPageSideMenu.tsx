import React, { useState } from 'react';
import type { FC } from 'react';
import * as S from './MyPageSideMenu.style';
import { useRouter } from 'next/router';

type MyPageSideMenuProps = {
  setAdminContent: React.Dispatch<React.SetStateAction<string>>;
};

const MyPageSideMenu: FC<MyPageSideMenuProps> = ({ setAdminContent }) => {
  const router = useRouter();
  const logout = () => {
    sessionStorage.clear();
    router.push('/');
  };
  return (
    <S.SideList>
      <S.SideItem>
        <li>
          <h2>사장님 정보</h2>
        </li>
        <li>
          <p onClick={() => setAdminContent('menu')}>메뉴판</p>
        </li>
        <li>
          <p onClick={() => setAdminContent('profile')}>회원정보</p>
        </li>
        <li>
          <p onClick={logout}>로그아웃</p>
        </li>
      </S.SideItem>
    </S.SideList>
  );
};

export default MyPageSideMenu;
