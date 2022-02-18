import { atom } from "recoil";

// FIXME: 이미지 업로드, 카테고리
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
