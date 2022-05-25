import Link from "next/link";
import React from "react";
import styled from "styled-components";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  justify: between;
  height:80px;
  align-items: center;
  margin:10px 0px 10px 0px;

  @media screen and (max-width: 500px){
    font:1.3rem;
  }
`;

const ListContents = styled.li `
  padding:3px;
  padding-left: 55px;
  margin: 9px 15px 9px 15px;
  &:hover{
    color:#FA4A0C;
  } 
  @media screen and (max-width: 500px){
    padding-left: 3px;
  }
`;

const StyledImg= styled.div`
  padding: 1rem 8px 0px 1rem;
  @media screen and (max-width: 400px){
    display:none;
  }
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
