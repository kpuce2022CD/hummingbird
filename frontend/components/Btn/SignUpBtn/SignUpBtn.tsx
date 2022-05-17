import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
const SignUpBtn = () => {
  const router = useRouter();
  return (
    <>
      <StyledBtn2 onClick={() => router.push('/signup')}>회원가입</StyledBtn2>
    </>
  );
};

const StyledBtn2 = styled.button`
  padding: 40px;
  margin: 30px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 15px;
  border: 2px solid #fff;
  font-weight: bold;
`;

export default SignUpBtn;
