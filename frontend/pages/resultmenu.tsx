import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';

import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import FoodList from '../components/FoodList';
import MenuBtmNav from '../components/MenuBtmNav';
import CartModal from '../components/CartModal';

type CategoryType = {
  id: number;
  name: string;
};

type Props = {
  CategoryData: CategoryType[];
};

const ResultMenu: NextPage = () => {
  const router = useRouter();
  const [tableNumber, setTableNumber] = useState<string>('');
  const [ownerId, setOwnerId] = useState<string>('');
  const [categoryData, setCategoryData] = useState<CategoryType[]>([]);
  const [openCartModal, setOpenCartModal] = useState<boolean>(false);

  const getCategoryUseMenuId = async (menuId: string | string[]) => {
    try {
      const response = await axios.get<CategoryType[]>(
        'http://localhost:8080/category/get/menu/' + menuId,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
      console.log(response.data);
      setCategoryData(response.data);
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    const menuId = String(router.query.menuId);
    const ownerId = String(router.query.ownerId);
    const tableNumber = String(router.query.table);

    if (menuId) {
      getCategoryUseMenuId(String(menuId));
      setTableNumber(tableNumber);
      setOwnerId(ownerId);
    }
  }, [router.query.menuId]);

  return (
    <Wrapper>
      <Header>
        <CartIcon onClick={() => setOpenCartModal(!openCartModal)} />
      </Header>
      <Title>
        <span>오더 캔버스</span>에서
        <br /> 바로 주문을 해보세요!
      </Title>
      <SearchBar />
      <CategoryListWrap>
        <CategoryList CategoryData={categoryData} />
      </CategoryListWrap>
      <FoodListWrap>
        <div className="foodList_moreBtn">
          <button>더 보기</button>
        </div>
        <FoodList />
      </FoodListWrap>
      <MenuBtmNav />
      {openCartModal && (
        <CartModal
          setOpenCartModal={setOpenCartModal}
          ownerId={ownerId}
          tableNumber={tableNumber}
        />
      )}
    </Wrapper>
  );
};

export default ResultMenu;

const Wrapper = styled.div`
  position: relative;
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
  cursor: pointer;
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
