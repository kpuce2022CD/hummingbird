import styled from 'styled-components';

export const Table = styled.table`
  margin: 20px;
  width: calc(100% - 40px);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 20px;

  tr,
  td,
  th {
    padding: 20px;
  }

  td {
    :first-child {
      font-weight: 600;
    }
  }

  tr {
    text-align: center;
    border-bottom: 1px solid var(--color-gray);
    :last-child {
      border: 0;
    }
  }

  th {
    font-size: 1.125rem;
    background-color: var(--color-light-gray);
    color: var(--color-orange);
    font-weight: 600;
    :first-child {
      border-top-left-radius: 20px;
    }
    :last-child {
      border-top-right-radius: 20px;
    }
  }
`;
