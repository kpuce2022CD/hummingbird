import styled from "styled-components";

interface Props {
  admin: boolean;
}
export const MenuItem = styled.div<Props>`
  display: flex;
  justify-content: center;
  width: ${({ admin }) => admin && "50%"};
  height: 250px;
  :nth-child(even) {
    padding-top: ${({ admin }) => (admin ? "50px" : "0px")};
  }

  ul {
    background-color: #fff;
    width: 156px;
    height: 220px;
    border-radius: 30px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    box-sizing: border-box;
    /* TODO ADMIN FALSE */
    margin-right: ${({ admin }) => (admin ? "0" : "10px")};
    :first-child {
      margin-left: ${({ admin }) => (admin ? "0" : "16px")};
    }
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
    text-align: center;
  }
  p {
    margin-top: 10px;
    text-align: center;
    color: var(--color-orange);
  }
`;
