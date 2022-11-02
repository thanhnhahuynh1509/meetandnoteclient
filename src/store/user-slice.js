import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { data: null },
  reducers: {
    updateUser(state, action) {
      state.data = action.payload;
    },
  },
});

export const selectUser = (state) => state.user.data;
export const { updateUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
