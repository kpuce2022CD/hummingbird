import React from "react";
import * as S from "./style";

const MenuBtmNav = () => {
  return (
    <S.Wrapper>
      <li>
        <S.HomeFill />
      </li>
      <li>
        <S.HeartFill />
      </li>
      <li>
        <S.PersonFill />
      </li>
      <li>
        <S.ClockFill />
      </li>
    </S.Wrapper>
  );
};

export default MenuBtmNav;
