import React from 'react';
import { useRecoilValue } from 'recoil';

import * as S from './style';
import { CartItemState } from '../../recoil/states';
import CartItem from '../CartItem';
import { numberFormat } from '../../utils/numberFormat';
import PayBtn from '../PayBtn';

type Props = {
  setOpenCartModal: React.Dispatch<React.SetStateAction<boolean>>;
  tableNumber: string;
  ownerId: string;
};
type CartData = {
  fileName: string;
  foodId: number;
  foodName: string;
  foodPrice: number;
  count: number;
};

const CartModal = ({ setOpenCartModal, ownerId, tableNumber }: Props) => {
  const CartList = useRecoilValue(CartItemState);

  const sumPrice = (CartList: CartData[]) => {
    let totalPrice = 0;
    if (CartList.length === 0) {
      return totalPrice;
    } else {
      CartList.map(({ count, foodPrice }) => {
        totalPrice += foodPrice * count;
      });
      return totalPrice;
    }
  };

  return (
    <S.Wrapper>
      <S.Header>
        <h1>장바구니</h1>
        <S.BackIcon onClick={() => setOpenCartModal(false)} />
      </S.Header>

      <S.CartList>
        <S.Notice>
          <S.TouchIcon />
          <p>총 상품금액 : {numberFormat(sumPrice(CartList))} 원</p>
        </S.Notice>
        {CartList.map(({ foodId, foodName, foodPrice, count, fileName }) => (
          <CartItem
            foodId={foodId}
            foodName={foodName}
            foodPrice={foodPrice}
            count={count}
            fileName={fileName}
          />
        ))}
      </S.CartList>
      <PayBtn
        amount={sumPrice(CartList)}
        itemList={CartList}
        ownerId={ownerId}
        tableNumber={tableNumber}
      />
    </S.Wrapper>
  );
};

export default CartModal;
