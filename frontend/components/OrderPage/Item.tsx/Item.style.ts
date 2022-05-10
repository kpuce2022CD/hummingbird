import styled from 'styled-components';

export const Wrap = styled.div`
  display: inline-block;
  background-color: ${(props) => props.color};
  margin: 0 auto;
  width: 100px;
  height: 20px;
  border-radius: 10px;
`;

export const Text = styled.p`
  text-align: left;
  padding-left: 10px;
  padding-top: 2px;
  span {
    font-weight: 900;
    margin-right: 10px;
  }
  color: ${(props) => props.color};
`;
