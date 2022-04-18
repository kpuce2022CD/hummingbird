import React from "react";
import Image from 'next/image'
import styled from "styled-components";
import Phone from '/public/img/QR/QRiPhone.svg'

const ExViewPhone = () => {
  return (
    <>
    <StyledImage/>
    </>
  );
};

const StyledImage = styled.div`
  position: absolute;
  left:75%;
  width: 70%;
  height: 700px;
  margin:0;
  padding:0;
  background-size: cover;
  object-fit: contain;
  background-image: url('img/QR/QRiPhone.svg');
`;
 
export default ExViewPhone;
