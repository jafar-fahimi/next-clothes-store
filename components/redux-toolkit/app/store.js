import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import itemReducer from "./itemSlice";

const logger = createLogger();

const store = configureStore({
  reducer: { item: itemReducer },
  middleware:
    process.env.NODE_ENV === "development" || "test"
      ? (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
      : null,
});
export default store;
// [2===3 && {s:12}].filter(Boolean); -> []
// [3===3 && {s:12}].filter(Boolean); -> [{s:12}]
