import Link from "next/link";
import React from "react";
import styled from "styled-components";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  justify: between;
  height:80px;
  align-items: center;
  margin-top:1rem;
`;

const ListContents = styled.li `
  padding:3px;
  padding-left: 3rem;
  margin: 9px 15px 9px 15px;
  &:hover{
    color:#FA4A0C;
  } 
`;

const StyledImg= styled.div`
  padding: 1rem 8px 0px 1rem;
`;

const StyledUl = styled.ul`
  display:flex;
  padding: 3px;
  font-weight: bold;
`;

const Nav = () => {
  return (
    <NavBar>
      <StyledImg>
        <img src="../img/nav_logo.svg"
        width="100px"
        height="100%"
        />
      </StyledImg>
      <StyledUl>
        <ListContents>
          <Link href={"/"}>홈</Link>
        </ListContents>
        <ListContents>
          <Link href={"/"}>소개</Link>
        </ListContents>
        <ListContents>
          <Link href={"/"}>마이페이지</Link>
        </ListContents>
      </StyledUl>
    </NavBar>
  );
};

export default Nav;
