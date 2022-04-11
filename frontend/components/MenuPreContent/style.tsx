import styled from "styled-components";
import { FiChevronLeft } from "react-icons/fi";
export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 414px;
  height: 896px;
  margin: 9px 0 0;
  border-radius: 30px;
  background-color: #eeeeee;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

export const MenuListContent = styled.div`
  margin-top: auto;
  border-radius: 30px;
  width: 414px;
  height: 766px;
  background-color: #f9f9f9;
  overflow: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const MenuHeader = styled.div`
  display: flex;
  margin: 70px 0px 0px 20px;
`;

export const BackBtn = styled(FiChevronLeft)`
  font-size: 1.125rem;
  margin-right: 20px;
`;

export const MenuTitle = styled.h2`
  font-weight: 700;
  font-size: 1.125rem;
`;

export const MenuListTitle = styled.div`
  display: flex;
  justify-content: center;

  h3 {
    font-size: 1.5rem;
    margin-top: 20px;
  }
`;

export const MenuItemWrap = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const MenuItem = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  :nth-child(even) {
    padding-top: 50px;
  }

  ul {
    background-color: #fff;
    width: 156px;
    height: 220px;
    border-radius: 30px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }

  li:first-child {
    padding-top: 12px;
    display: flex;
    justify-content: center;
    img {
      border-radius: 50%;
    }
  }

  h4 {
    margin-top: 10px;
    font-size: 1.25rem;
    font-weight: 700;
    text-align: center;
  }
  p {
    margin-top: 10px;
    text-align: center;
    color: var(--color-orange);
  }
`;
