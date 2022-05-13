import React from 'react';
import styled from 'styled-components';

const ExViewPhone = () => {
  return (
    <>
      <StyledImage />
    </>
  );
};

const StyledImage = styled.div`
  position: absolute;
  left: 75%;
  width: 75%;
  height: 700px;
  margin: 0;
  padding: 0;
  background-size: cover;
  object-fit: contain;
  background-image: url('img/QR/QRiPhone.svg');
  z-index: 100;
`;

export default ExViewPhone;
