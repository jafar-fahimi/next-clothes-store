import { atom } from "recoil";

export const productState = atom<null>({
  key: "productState",
  default: null,
});
