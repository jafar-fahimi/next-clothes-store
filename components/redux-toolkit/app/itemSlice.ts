import { createSlice } from "@reduxjs/toolkit";
// import { productState } from "atoms/productAtom";
// import UseCartItems from "atoms/useCartItems";
import { hatsCollection } from "public/images";
import { ItemPropsType } from "utils/types";
// import { useRecoilValue } from "recoil";

// initial value for cartItems
const initialItems: ItemPropsType[] = [
  {
    id: "price_1MfxIgJna0QE1h10zbsuK1r9",
    name: "Brown Brim",
    imageUrl: hatsCollection,
    price: 25,
    qty: 3,
    total: 97,
  },
];

type StateType = {
  allExistingCarts: ItemPropsType[];
  cartItems: ItemPropsType[];
  totalPrice: number;
  totalItems: number;
};

// const existingItemsArray = useRecoilValue(productState);
// const existingItemsArray = UseCartItems2();
// console.log("existingItemsArray : ", existingItemsArray);

type setCartPayloadType = {
  stateCartItems: ItemPropsType[];
  stateTotalItems: number;
  stateTotalPrice: number;
};

const itemSlice = createSlice({
  name: "cart",
  initialState: {
    allExistingCarts: [],
    cartItems: initialItems,
    totalPrice: initialItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0),
    totalItems: initialItems.reduce((acc, cur) => acc + cur.qty, 0),
  },
  reducers: {
    addToCart(state: StateType, action: { payload: ItemPropsType }) {
      const existingItemAtAll = state.allExistingCarts.find((item) => item.id == action.payload.id);
      const existingItemInCart = state.cartItems.findIndex((item) => item.id === action.payload.id) !== -1;
      if (existingItemInCart) {
        // if the item exist in cart
        const existingItemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
        const thisItem = state.cartItems[existingItemIndex];
        if (thisItem.total <= 0) {
          localStorage.setItem("state", JSON.stringify(state));
          return;
        }
        thisItem.qty += 1;
        thisItem.total -= 1;
      } else {
        action.payload["qty"] = 1;
        // action.payload.total = 99; // set it from useRecoilValue
        existingItemAtAll != undefined && (action.payload.total = existingItemAtAll.total -= 1);
        state.cartItems.push(action.payload);
      }
      state.totalPrice = Number(state.totalPrice + action.payload.price);
      state.totalItems = state.totalItems + 1;
      localStorage.setItem("state", JSON.stringify(state));
    },
    deleteFromCart: (state: StateType, action: { payload: ItemPropsType }) => {
      const toDeleteItem = state.cartItems.find((item) => item.name === action.payload.name);
      if (toDeleteItem) {
        // decreasing totalPrice:
        state.totalPrice -= (toDeleteItem?.price as number) * (toDeleteItem?.qty as number);
        // as; to declare that it's never undefined
        state.totalItems -= toDeleteItem?.qty as number;
        toDeleteItem.total = 100;
        const nextStateItems = state.cartItems.filter((item) => item.name !== action.payload.name);
        state.cartItems = nextStateItems;
      } else {
        return;
      }
      localStorage.setItem("state", JSON.stringify(state));
    },
    minusFromCart: (state: StateType, action: { payload: ItemPropsType }) => {
      const prevItem = state.cartItems.find((item: { name: string }) => item.name == action.payload.name);
      if (prevItem) {
        if (prevItem.qty == 0) {
          const nextStateItems = state.cartItems.filter((item) => item.name !== action.payload.name);
          state.cartItems = nextStateItems;
        }
        if (!prevItem.qty) {
          prevItem.qty = 0;
        } else {
          prevItem.qty--;
          prevItem.total += 1;
          state.totalPrice -= +prevItem.price;
          state.totalItems -= 1;
        }
      } else return;
      localStorage.setItem("state", JSON.stringify(state));
    },
    setCart: (state: StateType, action: { payload: setCartPayloadType }) => {
      // setCart is just used in <Layout /> to take data from localStorage if any.
      state.cartItems = action.payload.stateCartItems;
      state.totalItems = action.payload.stateTotalItems;
      state.totalPrice = action.payload.stateTotalPrice;

      console.log("action.payload is ", action.payload);
      // localStorage.setItem("state", JSON.stringify(state));
    },
    setAllData: (state: StateType, action: { payload: ItemPropsType[] }) => {
      state.allExistingCarts = action.payload;
      console.log("action.payload is ", action.payload);
    },
  },
});

export default itemSlice.reducer;
export const { addToCart, minusFromCart, deleteFromCart, setCart, setAllData } = itemSlice.actions;
