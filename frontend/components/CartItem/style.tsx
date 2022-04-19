import styled from "styled-components";

export const ItemWrap = styled.div`
  display: flex;
  margin-top: 24px;
  background-color: #fff;
  padding: 15px;
  border-radius: 20px;
  box-sizing: content-box;

  img {
    border-radius: 50%;
  }
`;

export const ContentWrap = styled.div`
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
