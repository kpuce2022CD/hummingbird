import React from 'react'
import styled from 'styled-components';

function Login() {
  return (
      <LoginSection>
        <Form>
            <H1>로그인</H1>
            <p>신규 사용자이신가요? <Atag href='#'>계정 만들기</Atag></p>
            <Input>
                <Label>아이디</Label>
                <InputSection type="id" placeholder="아이디를 입력하세요"/>
            </Input>
            <Input>
                <Label>비밀번호</Label>
                <InputSection type="password" placeholder="비밀번호를 입력하세요"/>
            </Input>
        <Loginbtn>login</Loginbtn> 
        </Form>
      </LoginSection>
  )
}
const LoginSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const H1 = styled.h1`
    margin-bottom:1rem;
    margin-top:1rem;

    font-size: 2rem;
    font-weight: bold;
    color: #FA4A0C;
`
const Atag = styled.a`
    color:blue;
`

const InputSection = styled.input`
    padding: 10px;
    width:100%;

    border-radius:30px;
    border: 1px solid lightgray;
    background:#dcdcdc;
    outline:none;
`
const Input = styled.label`
    margin-top: 20px;
    width: 80%;
`
const Label = styled.div`
    margin: 13px 0px 15px 15px;
    font-weight: bold;
`

const Loginbtn = styled.button`
    margin-top:3rem;
    padding:1rem;
    margin-bottom:1rem;
    
    background: linear-gradient(to right, #EBB866, #FA4A0C);
    border-radius:10px;
    color:white;
    letter-spacing: 3px;
`


const Form = styled.form`
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;

  padding: 3rem;
  margin: 3rem;
  width:550px;
  outline:none;
  box-shadow: 2px 2px 6px grey;
  
  @media screen and (max-width: 500px){
      width:80%;
  }
`;

export default Login;