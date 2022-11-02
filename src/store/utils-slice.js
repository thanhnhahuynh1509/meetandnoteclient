import { createSlice } from "@reduxjs/toolkit";

const utilsSlice = createSlice({
  name: "utils",
  initialState: { data: { isOpenAttributes: false } },
  reducers: {
    setIsOpenAttributes(state, action) {
      state.data.isOpenAttributes = action.payload;
    },
  },
});

export const selectIsOpenAttributes = (state) =>
  state.utils.data.isOpenAttributes;
export const { setIsOpenAttributes } = utilsSlice.actions;
export const utilsReducer = utilsSlice.reducer;
