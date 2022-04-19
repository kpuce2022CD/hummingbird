import styled from "styled-components";
import {
  AiFillHome,
  AiOutlineHome,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";

import { BsPersonFill, BsPerson, BsClock, BsClockFill } from "react-icons/bs";

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  margin-bottom: 40px;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;

  li {
    color: gray;
    opacity: 0.9;
    list-style: none;
    font-size: 2rem;
    text-align: center;

    :hover {
      transition: all 0.1s ease-in-out;
      color: var(--color-orange);
    }
  }
`;

export const HomeFill = styled(AiFillHome)``;

export const HeartFill = styled(AiFillHeart)``;

export const PersonFill = styled(BsPersonFill)``;

export const ClockFill = styled(BsClockFill)``;
