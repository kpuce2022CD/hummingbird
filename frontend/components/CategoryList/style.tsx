import styled from "styled-components";

export const CategoryWrap = styled.div`
  display: flex;
  overflow: scroll;
  overflow-y: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryItem = styled.li`
  font-size: 1.2rem;
  border: 1px solid black;
  padding: 10px;
  width: 100px;
  color: #9a9a9d;
`;
