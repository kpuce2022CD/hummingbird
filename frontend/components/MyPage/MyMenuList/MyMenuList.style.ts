import styled from "styled-components";

export const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  margin: auto 0;

  span {
    cursor: pointer;
  }
`;

export const HeaderTitle = styled.h2`
  display: inline-block;
  font-size: 1.5rem;
  box-sizing: border-box;
  padding-right: 12px;
  font-weight: 700;
`;

export const MenuContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 50px 10px;

  .MenuCard__wrapper {
    margin: 30px;
  }
`;
