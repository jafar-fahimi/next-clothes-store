import { atom } from "recoil";

export const productState = atom<[]>({
  key: "productState",
  default: [],
});

// export function UseCartItems2() {
//   const existingItemsArray = useRecoilValue(productState);
//   return existingItemsArray;
// }
