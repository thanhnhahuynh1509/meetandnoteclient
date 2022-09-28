import { createSlice } from "@reduxjs/toolkit";

const spaceSlice = createSlice({
  name: "screenSpaceAdditional",
  initialState: { data: { width: 0, height: 0 }, startContent: 0 },
  reducers: {
    addSpace(state, action) {
      const additionalSpace = action.payload;
      state.data.width += additionalSpace.width;
      state.data.height += additionalSpace.height;
    },
    updateStartContent(state, action) {
      state.startContent = action.payload;
    },
  },
});

export const { addSpace, updateStartContent } = spaceSlice.actions;
export const selectAdditionalSpace = (state) => state.additionalSpace.data;
export const selectStartContent = (state) => state.additionalSpace.startContent;
export const additionalSpaceReducer = spaceSlice.reducer;

export default spaceSlice;
