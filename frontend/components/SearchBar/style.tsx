import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

export const Wrapper = styled.div`
  display: flex;
  height: 60px;
  align-items: center;
  background-color: #efeeee;
  border-radius: 30px;
  padding: 10px 20px;
`;

export const SearchInput = styled.input`
  flex: 1;
  background: none;
  outline: none;
  border: none;

  ::-webkit-input-placeholder {
    color: gray;
  }
  :focus::-webkit-input-placeholder {
    color: transparent;
    transition: all 0.1s ease-in-out;
  }
`;

export const SearchIcon = styled(BsSearch)`
  font-size: 1.3rem;
  margin-right: 20px;
`;
