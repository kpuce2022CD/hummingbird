import React from "react";

import * as S from "./style";
const SearchBar = () => {
  return (
    <S.Wrapper>
      <S.SearchIcon />
      <S.SearchInput placeholder="찾으시는 메뉴를 검색해보세요." />
    </S.Wrapper>
  );
};

export default SearchBar;
