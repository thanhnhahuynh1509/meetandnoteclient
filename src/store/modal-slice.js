import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    data: {
      hide: true,
      title: "Test show",
      icon: <i className="fa-regular fa-circle-check"></i>,
      text: "This is text for test",
      buttonConfirmText: "OK",
    },
  },
  reducers: {
    updateModal(state, action) {
      state.data = { ...action.payload };
    },
  },
});

export const selectModal = (state) => state.modal.data;
export const { updateModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
export default modalSlice;
