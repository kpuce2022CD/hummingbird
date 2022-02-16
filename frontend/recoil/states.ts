import { atom } from "recoil";

interface menuInputCardType {
  menu: string;
  price: number;
  menuInfo: string;
  allergy: string;
}

const menuInputCardState = atom({
  key: "menuInputCard",
  default: [
    {
      menu: "",
      price: "",
      menuInfo: "",
      allergy: "",
    },
  ],
});

// 쓰이지는 않는다.
const menuNameState = atom({
  key: "menuName",
  default: "",
});

export { menuInputCardState, menuNameState };
