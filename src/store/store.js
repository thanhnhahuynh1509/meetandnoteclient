import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { componentReducer } from "./component-slice";
import { additionalSpaceReducer } from "./screen-additional-space";
import { modalReducer } from "./modal-slice";
import { userReducer } from "./user-slice";
import { roomReducer } from "./room-slice";
import { utilsReducer } from "./utils-slice";
import { chatReducer } from "./chat-slice";

export default configureStore({
  reducer: {
    component: componentReducer,
    additionalSpace: additionalSpaceReducer,
    modal: modalReducer,
    user: userReducer,
    currentRoom: roomReducer,
    utils: utilsReducer,
    chat: chatReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
