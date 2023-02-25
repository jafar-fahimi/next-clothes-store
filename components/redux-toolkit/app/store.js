import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import itemReducer from "./itemSlice";

const logger = createLogger();

const store = configureStore({
  reducer: { item: itemReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
