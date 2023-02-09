import { createSlice } from "@reduxjs/toolkit";

let localItem;
let localItemState: string | null = "{}";
if (typeof window !== "undefined") {
  localItem = localStorage.getItem("ITEM");
  localItemState = localStorage.getItem("state");
}

const stateCartItems = JSON.parse(localItemState || "{}")?.cartItems
  ? JSON.parse(localItemState || "{}").cartItems
  : [];
const stateTotalPrice = JSON.parse(localItemState || "{}")?.totalPrice
  ? JSON.parse(localItemState || "{}").totalPrice
  : 0;
const stateTotalItems = JSON.parse(localItemState || "{}")?.totalItems
  ? JSON.parse(localItemState || "{}").totalItems
  : 0;
const stateWishlist = JSON.parse(localItemState || "{}")?.wishlist
  ? JSON.parse(localItemState || "{}").wishlist
  : [];

const initialState = [
  { id: 1, name: "Brown Brim", imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png", price: 25, qty: 0 },
  { id: 2, name: "Brown Brim", imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png", price: 25, qty: 0 },
];

type StateProps = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  qty?: number;
};
type PayLoadProps = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

const itemSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: stateCartItems,
    totalPrice: stateTotalPrice,
    totalItems: stateTotalItems,
    wishlist: stateWishlist,
  },
  reducers: {
    // addToCart: (state: StateProps[], payload: PayLoadProps) => void {
    //   const prevItem = state.find((item) => item.name == payload.name);
    //   if (prevItem) {
    //     if (!prevItem.qty) {
    //       prevItem.qty = 1;
    //     } else {
    //       prevItem.qty++;
    //     }
    //   } else {
    //     const newState = [...state, payload];
    //     // const state = newState;
    //   }
    //   console.log("payload is: ", payload);
    //   localStorage.setItem("ITEM", JSON.stringify(state));
    // },
    addItem(state, action) {
      //   console.log(action.payload.price);
      //   console.log(state);

      if (state.cartItems.findIndex((item) => item._id === action.payload._id) !== -1) {
        // console.log("hello");
        const index = state.cartItems.findIndex((item) => item._id === action.payload._id);
        if (state.cartItems[index].countInStock === 0) {
          return;
        }

        // console.log(index);
        state.cartItems[index].countInStock = state.cartItems[index].countInStock - 1;
        state.cartItems[index].qty++;
        // console.log(state.cartItems);
      } else {
        action.payload["qty"] = 1;
        // console.log(action.payload);

        state.cartItems.push(action.payload);
        // console.log(action.payload.price);
      }
      //   console.log(state.totalPrice);
      state.totalPrice = Number((state.totalPrice + action.payload.price).toFixed(2));
      // Number(state.totalPrice).toFixed(2);

      state.totalItems = state.totalItems + 1;
      localStorage.setItem("state", JSON.stringify(state));
    },

    minusFromCart: (state, payload) => {
      const prevItem = state.find((item) => item.name == payload.name);
      if (prevItem) {
        if (!prevItem.qty) {
          prevItem.qty = 0;
        } else {
          prevItem.qty--;
        }
      } else {
        return;
      }
      console.log("payload is: ", payload);
    },
    deleteFromCart: (state, payload) => {
      const prevItem = state.find((item) => item.name == payload.name);
      if (prevItem) {
        state.filter((item) => item.name != payload.name);
      } else {
        return;
      }
      console.log("payload is: ", payload);
    },
  },
});

export default itemSlice.reducer;
export const { addToCart, minusFromCart, deleteFromCart } = itemSlice.actions;
