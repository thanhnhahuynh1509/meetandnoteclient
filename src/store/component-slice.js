import { createSlice } from "@reduxjs/toolkit";

const componentSlice = createSlice({
  initialState: { data: [] },
  name: "component",
  reducers: {
    addComponent(state, action) {
      state.data = [...state.data, action.payload];
    },
    removeComponent(state, action) {
      state.data = state.data.filter((c) => c.id !== action.payload.id);
    },
    updateComponent(state, action) {
      state.data = state.data.map((c) => {
        if (c.id === action.payload.id) {
          c = { ...action.payload };
        }
        return c;
      });
    },
  },
});

export const { addComponent, removeComponent, updateComponent } =
  componentSlice.actions;
export const selectComponents = (state) => state.component.data;
export const componentReducer = componentSlice.reducer;

export default componentSlice;
