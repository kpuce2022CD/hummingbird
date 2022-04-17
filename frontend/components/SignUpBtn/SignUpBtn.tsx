import React from "react";
import styled from "styled-components";

const SignUpBtn = () => {
  return (
    <>
      <StyledBtn2>
            회원가입
      </StyledBtn2>
    </>
  );
};

const StyledBtn2 = styled.button`
    padding: 40px;
    margin: 30px;
    padding-top:15px;
    padding-bottom:15px;    
    border-radius: 15px;
    border: 2px solid #fff;
    font-weight: bold;
`;
 
export default SignUpBtn;
