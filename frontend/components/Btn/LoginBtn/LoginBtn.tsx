import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
const LoginBtn = () => {
  const router = useRouter();
  return (
    <>
      <StyledBtn1 onClick={() => router.push('/loginpage')}>로그인</StyledBtn1>
    </>
  );
};

const StyledBtn1 = styled.button`
  padding: 40px;
  padding-top: 15px;
  padding-bottom: 15px;
  background: #fa4a0c;
  border-radius: 15px;
  margin: 30px;
  font-weight: bold;
`;

export default LoginBtn;
