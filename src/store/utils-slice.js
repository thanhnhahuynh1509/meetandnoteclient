import { createSlice } from "@reduxjs/toolkit";

const utilsSlice = createSlice({
  name: "utils",
  initialState: {
    data: {
      isOpenAttributes: false,
      lastRoomID: 0,
      lastComponentID: 0,
      trigger: { id: 1 },
    },
  },
  reducers: {
    setIsOpenAttributes(state, action) {
      state.data.isOpenAttributes = action.payload;
    },
    updateLastRoomID(state, action) {
      state.data.lastRoomID = action.payload;
    },
    updateLastComponentID(state, action) {
      state.data.lastComponentID = action.payload;
    },
    setTrigger(state, action) {
      state.data.trigger = action.payload;
    },
  },
});

export const selectIsOpenAttributes = (state) =>
  state.utils.data.isOpenAttributes;

export const selectLastIDRoom = (state) => state.utils.data.lastRoomID;

export const selectLastIDComponent = (state) =>
  state.utils.data.lastComponentID;

export const selectTrigger = (state) => state.utils.data.trigger;

export const {
  setIsOpenAttributes,
  updateLastRoomID,
  updateLastComponentID,
  setTrigger,
} = utilsSlice.actions;
export const utilsReducer = utilsSlice.reducer;
