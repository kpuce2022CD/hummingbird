import styled from 'styled-components';

export const Wrap = styled.div`
  display: inline-block;
  background-color: ${(props) => props.color};
  border-radius: 20px;
`;

export const Text = styled.p`
  text-align: left;
  padding: 2px 10px;

  span {
    font-weight: 900;
    padding-right: 8px;
  }
  color: ${(props) => props.color};
`;
