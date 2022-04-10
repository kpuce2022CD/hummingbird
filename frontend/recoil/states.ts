import { atom } from "recoil";

const menuIdState = atom<string | string[]>({
  key: "menuIdState",
  default: "",
});

export { menuIdState };
