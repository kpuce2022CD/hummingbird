import { atom } from "recoil";

interface menuInputCardType {
  menu: string;
  price: number;
  menuInfo: string;
}

const menuInputCardState = atom({
  key: "menuInputCard",
  default: [
    {
      menu: "",
      price: 0,
      menuInfo: "",
    },
  ],
});

export { menuInputCardState };
