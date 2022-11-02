import { createSlice } from "@reduxjs/toolkit";
const roomSlice = createSlice({
  name: "currentRoom",
  initialState: { data: null },
  reducers: {
    updateCurrentRoom(state, action) {
      state.data = action.payload;
    },
  },
});

export const selectCurrentRoom = (state) => state.currentRoom.data;
export const { updateCurrentRoom } = roomSlice.actions;
export const roomReducer = roomSlice.reducer;
