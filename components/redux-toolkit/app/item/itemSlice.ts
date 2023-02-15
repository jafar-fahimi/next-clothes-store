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

const allItems: StateProps[] = [
  { id: 1, name: "Brown Brim", imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png", price: 25, qty: 3 },
];

type StateProps = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  qty: number;
};
type PayLoadProps = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

let totalPriceValue = 0;
allItems.forEach((item) => (totalPriceValue += item.price * item.qty));

const itemSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: allItems,
    totalPrice: totalPriceValue,
    totalItems: allItems.length,
  },
  reducers: {
    addToCart(state, action) {
      if (state.cartItems.findIndex((item) => item.id === action.payload.id) !== -1) {
        const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
        state.cartItems[index].qty++;
      } else {
        action.payload["qty"] = 1;
        state.cartItems.push(action.payload);
      }
      state.totalPrice = Number((state.totalPrice + action.payload.price).toFixed(2));
      state.totalItems = state.totalItems + 1;
      localStorage.setItem("state", JSON.stringify(state));
      // console.log(state);
    },

    deleteFromCart: (state: { cartItems: StateProps[] }, { payload }: any) => {
      console.log("payload is: ", payload);
      const prevItem = state.cartItems.find((item) => item.name == payload.name);
      console.log("prevItem is: ", prevItem);
      if (prevItem) {
        state.cartItems.filter((item) => {
          console.log("item to delete is ", item.name);
          return item.name !== payload.name;
        });
      } else {
        return;
      }
      console.log("after delete payload is: ", payload);
    },
    minusFromCart: (state: { cartItems: StateProps[] }, { payload }: any) => {
      console.log("before minus state.cartItems is : ", state.cartItems);
      console.log("before minus state is : ", state);
      // console.log("before minus payload is: ", payload.name);
      const prevItem = state.cartItems.find((item: { name: string }) => item.name == payload.name);
      console.log("before minus prevItem is : ", prevItem);
      if (prevItem) {
        if (prevItem.qty == 0) {
          // deleteFromCart(payload);
          console.log("state.cartItems is : ", state.cartItems);
          state.cartItems.filter((item) => item.name != payload.name);
          // console.log("after minus payload is - in delete: ", payload);
        }
        if (!prevItem.qty) {
          prevItem.qty = 0;
        } else {
          prevItem.qty--;
        }
      } else {
        return;
      }
    },
  },
});

export default itemSlice.reducer;
export const { addToCart, minusFromCart, deleteFromCart } = itemSlice.actions;
