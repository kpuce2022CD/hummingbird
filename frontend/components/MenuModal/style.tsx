import styled from "styled-components";

export const ModalWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;
export const Modal = styled.div`
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 350px;
  background-color: #fff;
  // Modal 창 브라우저 가운데로 조정
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 10px;
  padding: 20px;

  form {
    width: 100%;
  }

  .file__input {
    display: block;
    width: 100%;
    margin-bottom: 20px;
  }

  .name__input,
  .price__input {
    display: block;
    width: 100%;
    padding: 5px 0px 5px 5px;
    margin-right: 20px;
    border-bottom: 1px solid gray;
    margin-bottom: 20px;
    outline: none;
  }

  .content__input {
    display: block;
    width: 100%;
    padding: 5px;
    margin-bottom: 12px;
    border: 1px solid gray;
    border-radius: 10px;
    resize: none;
    outline: none;
  }
`;

export const CateForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .cate__input {
    flex: none;
    display: block;
    width: 100%;
    padding: 5px 0px 5px 5px;
    margin: 20px 0px;
    border-bottom: 1px solid gray;
    outline: none;
  }

  p {
    color: gray;
  }
`;

export const SummitBtn = styled.button`
  display: block;
  height: 24px;
  width: 100%;
  font-weight: 700;
  border-radius: 10px;
  color: var(--color-orange);
  margin-top: auto;
  margin-bottom: 12px;
`;
export const ModalCloseBtn = styled.button`
  width: 100%;
  height: 14px;
  text-align: right;
`;
