import { atom } from "recoil";

export const productState = atom<null>({
  key: "productState",
  default: null,
});

// export function UseCartItems2() {
//   const existingItemsArray = useRecoilValue(productState);
//   return existingItemsArray;
// }
