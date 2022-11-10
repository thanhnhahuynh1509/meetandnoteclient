import { createSlice } from "@reduxjs/toolkit";

const componentSlice = createSlice({
  initialState: { data: [], currentComponent: null },
  name: "component",
  reducers: {
    initComopent(state, action) {
      state.data = action.payload;
    },
    addComponent(state, action) {
      if (action.payload != null) {
        state.data = [...state.data, action.payload];
      }
    },
    removeComponent(state, action) {
      state.data = [
        ...state.data.filter(
          (c) => c.id + c.type !== action.payload.id + action.payload.type
        ),
      ];
    },
    updateComponent(state, action) {
      const component = state.data.find(
        (c) => c.id + c.type === action.payload.id + action.payload.type
      );
      if (!component) state.data = [...state.data, action.payload];
      else {
        state.data = state.data.map((c) => {
          if (c.id + c.type === action.payload.id + action.payload.type) {
            return action.payload;
          }
          return c;
        });
      }
    },
    setCurrentComponent(state, action) {
      state.currentComponent = action.payload;
    },
  },
});

export const {
  addComponent,
  removeComponent,
  updateComponent,
  initComopent,
  setCurrentComponent,
} = componentSlice.actions;
export const selectComponents = (state) => state.component.data;
export const selectCurrentComponent = (state) =>
  state.component.currentComponent;
export const componentReducer = componentSlice.reducer;

export default componentSlice;
