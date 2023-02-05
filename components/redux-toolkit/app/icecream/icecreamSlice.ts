import { createSlice } from "@reduxjs/toolkit";

const initialState = { numIcecream: 20 };
const icecreamSlice = createSlice({
  name: "Icecream",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numIcecream--;
    },
    restocked: (state, action) => {
      state.numIcecream += action.payload;
    },
  },
});

export default icecreamSlice.reducer;
export const { ordered, restocked } = icecreamSlice.actions;
