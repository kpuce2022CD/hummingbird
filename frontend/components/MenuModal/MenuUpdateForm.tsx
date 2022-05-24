import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { menuIdState } from '../../recoil/states';
import * as S from './style';

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuId: number | undefined;
  menuName?: string;
};

const MenuUpdateForm = ({ setModalOpen, menuId, menuName }: Props) => {
  const [editMenuName, setEditMenuName] = useState<string>('');
  const router = useRouter();

  const updateMenu = async (updateName: string, menuId: number) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/menu/update',
        {
          menuName: updateName,
          menuId: String(menuId),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
      console.log(response);
      setModalOpen(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleMenuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditMenuName(e.target.value);
  };
  const handleUpdateMenuSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    typeof menuId !== 'undefined' && updateMenu(editMenuName, menuId);
  };
  const handleMenuFoodEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    menuId: number | undefined
  ) => {
    e.preventDefault();
    typeof menuId !== 'undefined' &&
      router.push({
        pathname: `/menupage/${menuId}`,
        query: { menuName: menuName },
      });
  };

  return (
    <S.CateForm onSubmit={handleUpdateMenuSubmit}>
      <input
        onChange={handleMenuChange}
        className="cate__input"
        name="category"
        placeholder="수정할 메뉴판명을 입력해주세요"
      ></input>
      <p>* 메뉴판 이름 수정 시에 입력한 메뉴판 명으로 변경됩니다.</p>
      <p>
        * 해당 메뉴판의 메뉴를 수정하시고 싶으시면 메뉴 구성 수정하기를
        눌러주세요.
      </p>
      <S.ButtonWrap>
        <S.Button>메뉴판 이름 수정하기</S.Button>
        <S.Button onClick={(e) => handleMenuFoodEdit(e, menuId)}>
          메뉴 구성 수정하기
        </S.Button>
      </S.ButtonWrap>
    </S.CateForm>
  );
};

export default MenuUpdateForm;
