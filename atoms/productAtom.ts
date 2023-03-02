import { atom } from "recoil";

export const productState = atom<[]>({
  key: "productStateKey",
  default: [],
});
