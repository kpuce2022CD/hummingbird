import { atom } from "recoil";

type FoodData = {
  content: string;
  fileName: string;
  filePath: string;
  id: number;
  name: string;
  origFileName: string;
  price: number;
};

const menuIdState = atom<string | string[]>({
  key: "menuIdState",
  default: "",
});

const ownerIdState = atom<number>({
  key: "ownerIdState",
  default: 0,
});

const foodListState = atom<FoodData[]>({
  key: "foodListState",
  default: [],
});

const tabClickedState = atom<number>({
  key: "tabClickedState",
  default: 0,
});

const tabClickedNameState = atom<string>({
  key: "tabClickedNameState",
  default: "",
});

export {
  menuIdState,
  ownerIdState,
  foodListState,
  tabClickedState,
  tabClickedNameState,
};
