import React from 'react';
import type { FC } from 'react';
import * as S from './Item.style';
type ItemProps = {
  bgColor: string;
  textColor: string;
};
const Item: FC<ItemProps> = ({
  bgColor = 'white',
  textColor = 'black',
  children,
}) => {
  return (
    <S.Wrap color={bgColor}>
      <S.Text color={textColor}>
        <span>&#183;</span>
        {children}
      </S.Text>
    </S.Wrap>
  );
};

export default Item;
