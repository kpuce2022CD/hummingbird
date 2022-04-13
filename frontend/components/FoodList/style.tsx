import styled from "styled-components";
import FoodMenuItem from "../FoodMenuItem";

export const Wrapper = styled.div`
  display: flex;
  overflow: scroll;
  overflow-y: hidden;
  scroll-behavior: smooth;
  margin-top: 30px;

  ::-webkit-scrollbar {
    display: none;
  }
`;
