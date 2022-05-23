import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { handleFormInputChange } from '../../../utils';
import * as S from './LoginForm.style';
function LoginForm() {
  const [formValue, setFormValue] = useState({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8080/api/owner/login',
        JSON.stringify(formValue),
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(res);
      sessionStorage.setItem('LoginSession', String(Cookies.get('JSESSIONID')));
      sessionStorage.setItem('ownerId', res.data.id);
      router.push('/');
      try {
      } catch (err) {}
      alert('로그인 되었습니다.');
    } catch (err) {
      alert('로그인 실패입니다.');
    }
  };

  return (
    <S.LoginSection>
      <S.Form onSubmit={handleSubmit}>
        <S.H1>로그인</S.H1>
        <p>
          신규 사용자이신가요? <a href="/signup">계정 만들기</a>
        </p>
        <S.Input>
          <S.Label>이메일</S.Label>
          <S.InputSection
            type="email"
            name="email"
            placeholder="이메일을 입력하세요"
            onChange={(e) => handleFormInputChange(e, setFormValue)}
          />
        </S.Input>
        <S.Input>
          <S.Label>비밀번호</S.Label>
          <S.InputSection
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => handleFormInputChange(e, setFormValue)}
          />
        </S.Input>
        <S.Loginbtn type="submit">login</S.Loginbtn>
      </S.Form>
    </S.LoginSection>
  );
}

export default LoginForm;
