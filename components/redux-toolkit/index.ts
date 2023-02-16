import store from "./app/store";
import { addToCart, minusFromCart, deleteFromCart } from "./app/item/itemSlice";

console.log("initial store ", store.getState());
const unsubscribe = store.subscribe(() => {
  // console.log("updated store ", store.getState());
});
store.dispatch(
  addToCart({
    id: 1,
    name: "Brown Brim",
    imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    price: 25,
    qty: 3,
  })
);
// store.dispatch(restocked(3));
unsubscribe();
