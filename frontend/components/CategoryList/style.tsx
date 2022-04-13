import styled from "styled-components";

export const CategoryWrap = styled.div`
  display: flex;
  overflow: scroll;
  overflow-y: hidden;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }

  ul {
    .tap {
      font-weight: 400;
    }
    .tap__active {
      font-weight: 700;
      color: var(--color-orange);
      border-bottom: 2px solid var(--color-orange);
    }
  }
`;

export const CategoryItem = styled.li`
  text-align: center;
  font-size: 1.2rem;
  padding: 10px;
  width: 100px;
  color: #9a9a9d;
`;
