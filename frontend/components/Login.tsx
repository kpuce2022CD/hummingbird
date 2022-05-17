import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { handleFormInputChange } from '../utils';
function Login() {
  const [formValue, setFormValue] = useState({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValue);

    try {
      const res = await axios.post(
        'http://localhost:8080/api/owner/login',
        JSON.stringify(formValue),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
      console.log(res);
      try {
      } catch (err) {}
      alert('로그인 되었습니다.');
    } catch (err) {
      alert('로그인 실패입니다.');
    }
  };

  return (
    <LoginSection>
      <Form onSubmit={handleSubmit}>
        <H1>로그인</H1>
        <p>
          신규 사용자이신가요? <a href="/signup">계정 만들기</a>
        </p>
        <Input>
          <Label>이메일</Label>
          <InputSection
            type="email"
            name="email"
            placeholder="이메일을 입력하세요"
            onChange={(e) => handleFormInputChange(e, setFormValue)}
          />
        </Input>
        <Input>
          <Label>비밀번호</Label>
          <InputSection
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => handleFormInputChange(e, setFormValue)}
          />
        </Input>
        <Loginbtn type="submit">login</Loginbtn>
      </Form>
    </LoginSection>
  );
}
const LoginSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const H1 = styled.h1`
  margin-bottom: 1rem;
  margin-top: 1rem;

  font-size: 2rem;
  font-weight: bold;
  color: #fa4a0c;
`;
const Atag = styled.a`
  color: sky-blue;
`;

const InputSection = styled.input`
  padding: 10px;
  width: 100%;

  border-radius: 30px;
  border: 1px solid lightgray;
  background: #dcdcdc;
  outline: none;
`;
const Input = styled.label`
  margin-top: 20px;
  width: 80%;
`;
const Label = styled.div`
  margin: 13px 0px 15px 15px;
  font-weight: bold;
`;

const Loginbtn = styled.button`
  margin-top: 3rem;
  padding: 1rem;
  margin-bottom: 1rem;

  background: linear-gradient(to right, #ebb866, #fa4a0c);
  border-radius: 10px;
  color: white;
  letter-spacing: 3px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 3rem;
  margin: 3rem;
  width: 550px;
  outline: none;
  box-shadow: 2px 2px 6px grey;

  @media screen and (max-width: 500px) {
    width: 80%;
  }
`;

export default Login;
