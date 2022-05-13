import styled from "styled-components";
import { FiMoreVertical } from "react-icons/fi";
export const ItemWrap = styled.div`
  display: flex;
  margin-top: 24px;
  background-color: #fff;
  padding: 15px;
  border-radius: 20px;

  img {
    border-radius: 50%;
    max-width: 100px;
    max-height: 100px;
  }
`;

export const ContentWrap = styled.div`
  position: relative;
  padding: 20px;
  flex: 1;
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
  }
`;

export const FoodPrice = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const PriceText = styled.p`
  color: var(--color-orange);
`;

export const CountBtn = styled.div`
  background-color: var(--color-orange);
  height: 22px;
  color: white;
  padding: 2px;
  border-radius: 20px;
  button {
    margin: 0px 6px;
    :hover {
      font-weight: 600;
      cursor: pointer;
      box-sizing: content-box;
    }
  }
`;

export const MoreBtn = styled(FiMoreVertical)`
  position: absolute;
  top: 8px;
  right: 0;
  font-size: 1.2rem;
  color: gray;
  cursor: pointer;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 6px;
  background-color: #fff;
  border: 1px solid gray;
  border-radius: 10px;

  li {
    padding: 10px;
    :hover {
      cursor: pointer;
      background-color: var(--color-orange);
      color: white;
    }
    :first-child {
      border-bottom: 1px solid gray;
      border-radius: 10px 10px 0px 0px;
    }
    :last-child {
      border-radius: 0px 0px 10px 10px;
    }
  }
`;
