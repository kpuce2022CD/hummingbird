import React from "react";
import styled from "styled-components";

const LoginBtn = () => {
  return (
    <>
      <StyledBtn1>
            로그인
      </StyledBtn1>
    </>
  );
};

const StyledBtn1 = styled.button`
    padding: 40px;
    padding-top:15px;
    padding-bottom:15px;    
    background: #FA4A0C;
    border-radius: 15px;
    margin: 30px;
    font-weight: bold;
`;
 
export default LoginBtn;
