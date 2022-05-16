import React from 'react';
import type { FC } from 'react';
import * as S from './SignUpForm.style';
type SignUpProps = {};

const SignUpForm: FC<SignUpProps> = () => {
  return (
    <>
      <S.SignUpSection>
        <S.Form>
          <S.H1>회원가입</S.H1>

          <S.Input>
            <S.Label>아이디</S.Label>
            <S.InputSection type="id" placeholder="아이디를 입력하세요" />
          </S.Input>
          <S.Input>
            <S.Label>비밀번호</S.Label>
            <S.InputSection
              type="password"
              placeholder="비밀번호를 입력하세요"
            />
          </S.Input>

          <S.Loginbtn>SignUp</S.Loginbtn>
        </S.Form>
      </S.SignUpSection>
    </>
  );
};

export default SignUpForm;
