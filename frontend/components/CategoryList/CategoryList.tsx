import React, { useState } from "react";
import { useRecoilState } from "recoil";
import * as S from "./style";
import axios from "axios";

import { foodListState } from "../../recoil/states";
type CategoryType = {
  id: number;
  name: string;
};

type Props = {
  CategoryData: CategoryType[];
};

type FoodData = {
  content: string;
  fileName: string;
  filePath: string;
  id: number;
  name: string;
  origFileName: string;
  price: number;
};

const CategoryList = ({ CategoryData }: Props) => {
  const [foodList, setFoodList] = useRecoilState(foodListState);

  const getFoodUseCategoryId = async (categoryId: number) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/food/get/category",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          params: {
            categoryId: categoryId,
          },
        }
      );
      setFoodList(response.data);
    } catch (err) {
      console.log("error", err);
    }
  };

  const [tabClicked, setTabClicked] = useState(0);
  console.log(CategoryData);
  const HandleTabClick = (categoryId: number) => {
    console.log(categoryId);
    setTabClicked(categoryId);
    if (categoryId === tabClicked) {
      getFoodUseCategoryId(categoryId);
    }
  };
  return (
    <S.CategoryWrap>
      {CategoryData.map(({ id, name }) => (
        <ul key={id}>
          <S.CategoryItem value={id} onClick={() => HandleTabClick(id)}>
            {name}
          </S.CategoryItem>
        </ul>
      ))}
    </S.CategoryWrap>
  );
};

export default CategoryList;
