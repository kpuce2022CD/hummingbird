import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { getSessionValue } from '../../utils';
import * as S from './style';

type Props = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuAddForm = ({ setModalOpen }: Props) => {
  const [menuName, setMenuName] = useState<string>('');
  //prettier-ignore
  const router = useRouter();

  const addNewMenu = async (menuName: string, ownerId: string) => {
    try {
      const data = {
        menuName: menuName,
        ownerId: ownerId,
      };
      const response = await axios.post(
        'http://34.64.187.105:8080/menu/new',
        data,
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

  const handleNewMenuSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (getSessionValue('ownerId') === null) {
      alert('로그인을 먼저 해주세요.');
      router.push('/loginpage');
    } else {
      addNewMenu(menuName, String(getSessionValue('ownerId')));
    }
  };
  const handleMenuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuName(e.target.value);
  };
  return (
    <div>
      <S.CateForm onSubmit={handleNewMenuSubmit}>
        <input
          onChange={handleMenuChange}
          className="cate__input"
          name="category"
          placeholder="메뉴판명을 입력해주세요"
        ></input>
        <S.SummitBtn className="submit__btn" type="submit">
          제출하기
        </S.SummitBtn>
      </S.CateForm>
    </div>
  );
};

export default MenuAddForm;
