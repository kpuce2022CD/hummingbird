import React from 'react'
import styled from 'styled-components';
import Image from 'next/image'

function Footer() {
  return (
    <Foot>
        <Image
          src="/img/logo.svg"
          width="100%"
          height="100%"/>
        <div>CopyRight&copy; Hummingbird</div>
    </Foot>
  )
}

const Foot = styled.div`
    display: flex;
    justify-content: space-between;
    height: 150px;
    padding: 100px;
    align-items: center;
    background-color: white;
`;

export default Footer