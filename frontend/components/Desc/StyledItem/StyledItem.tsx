import React from "react";
import styled from "styled-components";

const StyledItem = ({...content }) => {
  return (
    <>
    <Item> {content}</Item>
    </>
  );
};

const Item = styled.li`
  display: block;
  padding: 3px;
  margin: 15px;
  font-weight: 500;
  font-size:1.2rem;
`;
 
export default StyledItem;
