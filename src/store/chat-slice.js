import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: { data: [] },
  reducers: {
    updateChat(state, action) {
      const chat = state.data.find((m) => m.id === action.payload.id);
      if (!chat) {
        state.data = [...state.data, action.payload];
      } else {
        const data = state.data.map((m) => {
          if (m.id === chat.id) {
            return chat;
          }
          return m;
        });
        state.data = [...data];
      }
    },
  },
});

export const selectChat = (state) => state.chat.data;
export const { updateChat } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
