import { atom } from "recoil";

const menuIdState = atom<string | string[]>({
  key: "menuIdState",
  default: "",
});

const ownerIdState = atom<number>({
  key: "ownerIdState",
  default: 0,
});

export { menuIdState, ownerIdState };
