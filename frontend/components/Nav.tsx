import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { getSessionValue } from '../utils';

const Nav = () => {
  const router = useRouter();
  const handleMyPage = () => {
    getSessionValue('LoginSession') === null
      ? router.push('/loginpage')
      : router.push(`mypage/${getSessionValue('ownerId')}`);
  };

  return (
    <NavBar>
      <StyledImg onClick={() => router.push('/')}>
        <img src="../img/nav_logo.svg" width="100px" height="100%" />
      </StyledImg>
      <StyledUl>
        <ListContents>
          <Link href={'/'}>홈</Link>
        </ListContents>
        <ListContents>
          <Link href={'/'}>소개</Link>
        </ListContents>
        <ListContents onClick={handleMyPage}>마이페이지</ListContents>
      </StyledUl>
    </NavBar>
  );
};

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 80px;
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
  cursor: pointer;
  &:hover{
    color:#FA4A0C;
  } 
  @media screen and (max-width: 500px){
    padding-left: 3px;
  }
`;

const StyledImg = styled.div`
  padding: 1rem 8px 0px 1rem;
  @media screen and (max-width: 400px){
    display:none;
  }
`;

const StyledUl = styled.ul`
  display: flex;
  padding: 3px;
  font-weight: bold;
`;
export default Nav;
