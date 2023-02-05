import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import icecreamReducer from "./icecream/icecreamSlice";

const logger = createLogger();

const store = configureStore({
  reducer: { icecream: icecreamReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
