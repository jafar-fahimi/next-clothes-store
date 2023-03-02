import { createSlice } from "@reduxjs/toolkit";
import { ItemPropsType } from "utils/types";

// initial value for cartItems
const initialItems: ItemPropsType[] = [];

type StateType = {
  allExistingCarts: ItemPropsType[];
  cartItems: ItemPropsType[];
  totalPrice: number;
  totalItems: number;
};

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
      const toMinusItem = state.cartItems.find((item: { name: string }) => item.name == action.payload.name);
      if (toMinusItem) {
        if (toMinusItem.qty == 1) {
          const nextStateItems = state.cartItems.filter((item) => item.name !== action.payload.name);
          state.cartItems = nextStateItems;
        }
        if (!toMinusItem.qty) {
          toMinusItem.qty = 0;
        } else {
          toMinusItem.qty--;
          toMinusItem.total += 1;
          state.totalPrice -= +toMinusItem.price;
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
      localStorage.setItem("state", JSON.stringify(state));
    },
    setAllData: (state: StateType, action: { payload: ItemPropsType[] }) => {
      state.allExistingCarts = action.payload;
    },
  },
});

export default itemSlice.reducer;
export const { addToCart, minusFromCart, deleteFromCart, setCart, setAllData } = itemSlice.actions;
