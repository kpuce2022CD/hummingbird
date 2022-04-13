import { NextPage } from "next";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import { GetServerSideProps } from "next";
import axios from "axios";
import CategoryList from "../components/CategoryList";
import FoodList from "../components/FoodList";

type CategoryType = {
  id: number;
  name: string;
};

type Props = {
  CategoryData: CategoryType[];
};

const ResultMenu: NextPage<Props> = ({ CategoryData }) => {
  return (
    <Wrapper>
      <Header>
        <CartIcon />
      </Header>
      <Title>
        <span>메뉴 캔버스</span>에서
        <br /> 바로 주문을 해보세요!
      </Title>
      <SearchBar />
      <CategoryListWrap>
        <CategoryList CategoryData={CategoryData} />
      </CategoryListWrap>
      <FoodListWrap>
        <div className="foodList_moreBtn">
          <button>더 보기</button>
        </div>
        <FoodList />
      </FoodListWrap>
    </Wrapper>
  );
};

export default ResultMenu;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { menuId } = context.query;
  try {
    const response = await axios.get<CategoryType[]>(
      "http://localhost:8080/category/get/menu",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        params: {
          menuId: menuId,
        },
      }
    );
    const data = response.data;
    return {
      props: {
        CategoryData: data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
};

const Wrapper = styled.div`
  width: 414px;
  background-color: var(--color-light-gray);
  height: 896px;
  padding: 40px;
`;

const Header = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 30px;
`;

const CartIcon = styled(AiOutlineShoppingCart)`
  color: gray;
  font-size: 1.75rem;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  line-height: 2.2rem;
  margin-bottom: 30px;

  span {
    color: var(--color-orange);
    font-weight: 700;
  }
`;

const CategoryListWrap = styled.div`
  margin-top: 30px;
`;

const FoodListWrap = styled.div`
  margin-top: 30px;

  .foodList_moreBtn {
    display: flex;
    justify-content: end;
    color: var(--color-orange);
  }
`;
