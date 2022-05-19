import React, { useEffect, useState } from 'react';
import * as S from './MyMenuList.style';
import EditPlusBtn from '../../EditPlusBtn';
import MenuModal from '../../MenuModal';
import { useRouter } from 'next/router';
import MenuCard from '../../MenuCard';

type Menu = {
  id: number;
  name: string;
};

type Props = {
  menuList: Menu[] | undefined;
};

const MyMenuList = ({ menuList }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <S.HeaderWrap>
        <S.HeaderTitle>메뉴판 추가</S.HeaderTitle>
        <span onClick={() => setModalOpen(true)}>
          <EditPlusBtn />
        </span>
      </S.HeaderWrap>
      <S.MenuContent>
        {menuList &&
          menuList.map(({ id, name }) => (
            <div className="MenuCard__wrapper" key={id}>
              <MenuCard menuId={id} menuName={name} />
            </div>
          ))}
      </S.MenuContent>
      {modalOpen && <MenuModal setModalOpen={setModalOpen} type="메뉴판" />}
    </div>
  );
};

export default MyMenuList;
