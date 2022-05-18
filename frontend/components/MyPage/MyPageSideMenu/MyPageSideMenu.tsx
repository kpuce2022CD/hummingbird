import React, { useState } from 'react';
import type { FC } from 'react';
import * as S from './MyPageSideMenu.style';

type MyPageSideMenuProps = {
  setAdminContent: React.Dispatch<React.SetStateAction<string>>;
};

const MyPageSideMenu: FC<MyPageSideMenuProps> = ({ setAdminContent }) => {
  return (
    <S.SideList>
      <S.SideItem>
        <li>
          <h2>사장님 정보</h2>
        </li>
        <li>
          <p onClick={() => setAdminContent('profile')}>회원정보</p>
        </li>
        <li>
          <p onClick={() => setAdminContent('menu')}>메뉴판</p>
        </li>
      </S.SideItem>
    </S.SideList>
  );
};

export default MyPageSideMenu;
