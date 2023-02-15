import { createSlice } from "@reduxjs/toolkit";
// let localItem;
// let localItemState: string | null = "{}";
// if (typeof window !== "undefined") {
//   localItem = localStorage.getItem("ITEM");
//   localItemState = localStorage.getItem("state");
// }

// const stateCartItems = JSON.parse(localItemState || "{}")?.cartItems
//   ? JSON.parse(localItemState || "{}").cartItems
//   : [];
// const stateTotalPrice = JSON.parse(localItemState || "{}")?.totalPrice
//   ? JSON.parse(localItemState || "{}").totalPrice
//   : 0;
// const stateTotalItems = JSON.parse(localItemState || "{}")?.totalItems
//   ? JSON.parse(localItemState || "{}").totalItems
//   : 0;
// const stateWishlist = JSON.parse(localItemState || "{}")?.wishlist
//   ? JSON.parse(localItemState || "{}").wishlist
//   : [];

const allItems: Props[] = [
  { id: 1, name: "Brown Brim", imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png", price: 25, qty: 3 },
];
type Props = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  qty: number;
};

type StateAction = {
  cartItems: Props[];
  totalPrice: number;
  totalItems: number;
};
const itemSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: allItems,
    totalPrice: allItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0),
    totalItems: allItems.length,
  },
  reducers: {
    addToCart(state: StateAction, action: { payload: Props }) {
      if (state.cartItems.findIndex((item) => item.id === action.payload.id) !== -1) {
        const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
        state.cartItems[index].qty++;
      } else {
        action.payload["qty"] = 1;
        state.cartItems.push(action.payload);
      }
      state.totalPrice = Number((state.totalPrice + action.payload.price).toFixed(2));
      state.totalItems = state.totalItems + 1;
      // localStorage.setItem("state", JSON.stringify(state));
      // console.log(state);
    },

    deleteFromCart: (state: StateAction, action: { payload: Props }) => {
      const prevItem = state.cartItems.find((item) => item.name == action.payload.name);
      if (prevItem) {
        // decreasing totalPrice:
        const toDeleteItem = state.cartItems.find((item) => item.name === action.payload.name);
        state.totalPrice -= (toDeleteItem?.price as number) * (toDeleteItem?.qty as number);
        // as; to declare that it's never undefined

        const nextStateItems = state.cartItems.filter((item) => item.name !== action.payload.name);
        state.cartItems = nextStateItems;
      } else {
        return;
      }
    },
    minusFromCart: (state: StateAction, action: { payload: Props }) => {
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
          state.totalPrice -= prevItem.price;
        }
      } else {
        return;
      }
    },
  },
});

export default itemSlice.reducer;
export const { addToCart, minusFromCart, deleteFromCart } = itemSlice.actions;
