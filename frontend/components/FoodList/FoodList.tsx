import React from "react";
import { useRecoilValue } from "recoil";
import { foodListState } from "../../recoil/states";
import FoodMenuItem from "../FoodMenuItem";

import * as S from "./style";
const FoodList = () => {
  const foodList = useRecoilValue(foodListState);
  return (
    <S.Wrapper>
      {foodList.map(({ id, fileName, filePath, name, price, origFileName }) => (
        <FoodMenuItem
          key={id}
          fileName={fileName}
          idx={id}
          foodName={name}
          foodPrice={price}
          admin={false}
        />
      ))}
    </S.Wrapper>
  );
};

export default FoodList;
