import styled from "styled-components";
import { BsChevronLeft } from "react-icons/bs";
import { MdOutlineTouchApp } from "react-icons/md";

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 414px;
  background-color: var(--color-light-gray);
  height: 896px;
  padding: 40px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 30px;

  h1 {
    font-size: 1.5rem;
    flex: 1;
    font-weight: 600;
    text-align: center;
  }
`;

export const BackIcon = styled(BsChevronLeft)`
  font-size: 1.75rem;
  cursor: pointer;
`;

export const TouchIcon = styled(MdOutlineTouchApp)`
  margin-right: 10px;
  font-size: 1.5rem;
`;

export const Notice = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: center;
  font-size: 1.125rem;
  line-height: 1.5rem;
  color: gray;
  padding-right: 20px;
`;

export const PaymentBtn = styled.button`
  position: absolute;
  bottom: 0;
  background-color: var(--color-orange);
  width: 80%;
  height: 70px;
  border-radius: 30px;
  color: #fff;
  font-size: 1.125rem;
  margin-bottom: 30px;
`;
