import styled from "styled-components";

export const MenuInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;

export const MenuEditWrap = styled.div`
  display: flex;
  height: 100vh;
`;

export const MenuEditSideMenu = styled.ul`
  background-color: var(--color-mid-gray);
  width: 200px;
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  align-items: left;

  .tap {
    font-weight: 400;
  }
  .tap__active {
    font-weight: 700;
    color: var(--color-orange);
  }
  .menuedit-content__header {
    display: flex;
    justify-content: center;
  }
  .menuedit-btn {
    margin-top: 25px;
    background-color: var(--color-orange);
    padding: 10px;
    color: white;
    border-radius: 25px;
    font-size: 0.9rem;
    line-height: 1.5rem;
    font-weight: 700;
    cursor: pointer;
  }
`;

export const SideList = styled.li`
  padding: 20px 0px;
  cursor: pointer;
  :hover {
    font-weight: 700;
  }
  p {
    display: inline-block;
    color: var(--color-orange);
    width: 22px;
    text-align: center;
    padding-top: 2px;
    margin-right: 5px;
    height: 22px;
    border-radius: 50px;
    background-color: #fff;
    border: 1px solid var(--color-orange);
  }
`;

export const MenuEditContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0px 0px 10px;
  margin-right: 20px;
  border-top-right-radius: 20px;
  background-color: var(--color-light-gray);
  .menuEdit-notice__wrap {
    display: flex;
    justify-content: center;
  }
  .menuEdit-notice {
    font-size: 1rem;
    padding-top: 200px;
    text-align: center;
    width: 230px;
    color: gray;
  }
`;

export const MenuEditContentBtn = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 5px;

  button {
    padding: 10px 20px;
    border-radius: 25px;
    font-size: 0.9rem;
    line-height: 1.5rem;
    font-weight: 700;
    background-color: #fff;
    color: var(--color-orange);
    border: 1px solid var(--color-orange);

    :hover {
      background-color: var(--color-orange);
      color: #fff;
    }
  }
`;
