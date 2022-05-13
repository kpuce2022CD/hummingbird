import styled from "styled-components";

export const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 400px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const CardTitle = styled.li`
  font-weight: 700;
  font-size: 1.75rem;
  line-height: 2rem;
  padding-bottom: 10px;
  h2 {
    background: linear-gradient(to right, #f32170, #ff6b08, #cf23cf, #eedd44);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }
`;

export const CardSubTitle = styled.li`
  color: gray;
  padding-bottom: 40px;
`;

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  border: 1px solid gray;
  padding: 15px;
  font-size: 1.125rem;
  margin-bottom: 10px;
  border-radius: 20px;

  color: gray;
  :last-child {
    margin: 0;
  }
  :hover {
    background-image: linear-gradient(-60deg, #ff5858 0%, #f09819 100%);
    color: #fff;
    border: 1px solid #fff;
  }
`;
