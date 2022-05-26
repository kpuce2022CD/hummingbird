import styled from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 100px;
`;

export const DatePickerWrap = styled.div`
  display: flex;
  flex: 1;
  p {
    padding-top: 8px;
    width: 20%;
    vertical-align: baseline;
  }
  input {
    border: 1px solid var(--color-orange);
    border-radius: 10px;
    padding: 5px;
    cursor: pointer;
  }
`;

export const Btn = styled.button`
  background-color: var(--color-orange);
  color: white;
  padding: 10px;
  border-radius: 10px;
`;
