import styled from 'styled-components';

export const SignUpSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const H1 = styled.h1`
  margin-bottom: 1rem;
  margin-top: 1rem;

  font-size: 2rem;
  font-weight: bold;
  color: #fa4a0c;
`;
export const Atag = styled.a`
  color: sky-blue;
`;

export const InputSection = styled.input`
  padding: 10px;
  width: 100%;

  border-radius: 30px;
  border: 1px solid lightgray;
  background: #dcdcdc;
  outline: none;
`;
export const Input = styled.label`
  margin-top: 20px;
  width: 80%;
`;
export const Label = styled.div`
  margin: 13px 0px 15px 15px;
  font-weight: bold;
`;

export const Loginbtn = styled.button`
  margin-top: 3rem;
  padding: 1rem;
  margin-bottom: 1rem;

  background: linear-gradient(to right, #ebb866, #fa4a0c);
  border-radius: 10px;
  color: white;
  letter-spacing: 3px;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 3rem;
  margin: 3rem;
  width: 550px;
  outline: none;
  box-shadow: 2px 2px 6px grey;

  @media screen and (max-width: 500px) {
    width: 80%;
  }
`;
