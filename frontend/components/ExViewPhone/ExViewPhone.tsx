import React from "react";
import Image from 'next/image'
import styled from "styled-components";
import Phone from '/public/img/QR/QRiPhone.svg'

const ExViewPhone = () => {
  return (
    <>
      <Image
            src={Phone}
            alt="휴대폰 화면 예시"
            width="900px"
            height="100%"
            // layout="responsive"
            />
    </>
  );
};
 
export default ExViewPhone;
