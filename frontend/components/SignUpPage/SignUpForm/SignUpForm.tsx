import React, { useState } from 'react';
import type { FC } from 'react';
import * as S from './SignUpForm.style';
import axios from 'axios';
import { handleFormInputChange } from '../../../utils/handleFormInputChange';
import { useRouter } from 'next/router';
type SignUpProps = {};

const SignUpForm: FC<SignUpProps> = () => {
  const [formValue, setFormValue] = useState({});
  const router = useRouter();
  const SignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValue);
    try {
      const res = await axios.post(
        'http://34.64.187.105:8080/api/owner/signup',
        JSON.stringify(formValue),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
      console.log(res);
      alert('회원가입 되었습니다.');
      router.push('/loginpage');
    } catch (err) {
      console.log(err);
      alert('회원가입 실패입니다.!');
    }
  };
  return (
    <>
      <S.SignUpSection>
        <S.Form onSubmit={SignUpSubmit}>
          <S.H1>회원가입</S.H1>
          <S.Input>
            <S.Label>이름</S.Label>
            <S.InputSection
              type="text"
              name="name"
              placeholder="이름을 입력하세요"
              onChange={(e) => handleFormInputChange(e, setFormValue)}
            />
          </S.Input>
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
          <S.Input>
            <S.Label>비밀번호 확인</S.Label>
            <S.InputSection
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => handleFormInputChange(e, setFormValue)}
            />
          </S.Input>
          <S.Input>
            <S.Label>사업자등록번호</S.Label>
            <S.InputSection
              type="text"
              name="businessRegistrationNumber"
              placeholder="사업자등록번호 입력하세요"
              onChange={(e) => handleFormInputChange(e, setFormValue)}
            />
          </S.Input>
          <S.Loginbtn type="submit">SignUp</S.Loginbtn>
        </S.Form>
      </S.SignUpSection>
    </>
  );
};

export default SignUpForm;
