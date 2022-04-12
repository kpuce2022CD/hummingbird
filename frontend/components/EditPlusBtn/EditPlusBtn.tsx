import React from "react";
import styled from "styled-components";
import { ImPlus } from "react-icons/im";

const EditPlusBtn = () => {
  return (
    <>
      <Btn />
    </>
  );
};

const Btn = styled(ImPlus)`
  display: inline-block;
  background-color: white;
  border-radius: 50%;
  font-size: 42px;
  padding: 12px;
  /* #19 */
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

export default EditPlusBtn;
