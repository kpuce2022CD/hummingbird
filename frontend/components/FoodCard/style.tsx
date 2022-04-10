import styled from "styled-components";

export const FoodCardWrap = styled.div`
  margin-top: 20px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const FoodItem = styled.div`
  margin: 11px 16px 30px 16px;
  padding: 15px;
  box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.04);
  background-color: #fff;
  border-radius: 20px;

  .foodcard-top {
    display: flex;
  }
  Image {
  }

  .foodcard_top__content {
    margin-left: 10px;
    flex: 1;
  }

  .foodcard_top__name {
    text-align: center;
    font-size: 17px;
    font-weight: 600;
  }

  .foodcard_top__list {
    margin-left: 10px;
    margin-top: 10px;

    li {
      font-size: 13px;
      margin-left: auto;
      color: gray;
      margin-bottom: 5px;

      :last-child {
        margin: 0;
      }
      span {
        display: inline-block;
        width: 100px;
        color: #000;
      }
    }
  }

  .foodcard_btm {
    margin-top: 10px;
    font-size: 13px;

    li {
      margin-bottom: 5px;
      :last-child {
        color: gray;
        line-height: 16px;
        margin: 0;
      }
    }
  }
`;
