import styled from 'styled-components';

export const Wrap = styled.div`
  overflow: scroll;
  scroll-behavior: smooth;
  padding: 20px;
  width: 100%;
  overflow-x: hidden;
`;

export const ListItem = styled.div`
  display: flex;
  padding-bottom: 50px;
  :last-child {
    padding: 0;
  }
  div {
    :first-child {
      padding-right: 50px;
    }
    :last-child {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      h1 {
        font-size: 2rem;
        font-weight: 700;
        padding-bottom: 15px;
      }
      div {
        flex: 1;
        color: gray;
        line-height: 2rem;
      }

      button {
        font-size: 1.5rem;
        background-color: var(--color-orange);
        color: white;
        width: 100%;
        border-radius: 35px;
        box-shadow: 0 4px 4px 0 rgb(0 0 0 / 25%);
      }
    }
  }
`;
