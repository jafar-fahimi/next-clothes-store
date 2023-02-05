import store from "./app/store";
import { ordered, restocked } from "./app/icecream/icecreamSlice";

console.log("initial store ", store.getState());
const unsubscribe = store.subscribe(() => {
  // console.log("updated store ", store.getState());
});
store.dispatch(ordered());
store.dispatch(restocked(3));
unsubscribe();
