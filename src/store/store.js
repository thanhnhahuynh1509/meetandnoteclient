import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { componentReducer } from "./component-slice";
import { additionalSpaceReducer } from "./screen-additional-space";
import { modalReducer } from "./modal-slice";

export default configureStore({
  reducer: {
    component: componentReducer,
    additionalSpace: additionalSpaceReducer,
    modal: modalReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
