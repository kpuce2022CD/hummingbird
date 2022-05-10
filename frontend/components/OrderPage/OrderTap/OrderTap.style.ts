import styled from 'styled-components';

export const Tab = styled.ul`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid gray;

  li {
    margin-right: 20px;
    font-size: 1.125rem;
    padding-bottom: 10px;
  }
  .tap {
  }
  .tap__active {
    color: var(--color-orange);
    font-weight: 700;
  }
`;
