import React from "react";
import Image from 'next/image'
import styled from "styled-components";
import twoPhone from '/public/img/GroupPhone.svg'


const StyledTwoPhone = () => {
  return (
    <>
      <StyledImg>
            <Image
              src={twoPhone}
              alt="휴대폰 두개 겹친 이미지"
              width="550rem"
              height="550rem"
              // layout="responsive"
            />   
      </StyledImg>
    </>
  );
};

const StyledImg = styled.div`
    display: span;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin: auto;
    max-width: 450px;
    max-height:450px;
`;

export default StyledTwoPhone;
