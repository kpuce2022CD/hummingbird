import React from 'react'
import styled from 'styled-components';

function Footer() {
  return (
    <Foot>
        <div>logo</div>
        <div>CopyRight&copy; Hummingbird</div>
    </Foot>
  )
}

const Foot = styled.div`
    display: flex;
    justify-content: space-between;
    height: 200px;
    padding: 100px;
    align-items: center;
    background-color: white;
`;

export default Footer