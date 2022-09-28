import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { componentReducer } from "./component-slice";
import { additionalSpaceReducer } from "./screen-additional-space";

export default configureStore({
  reducer: {
    component: componentReducer,
    additionalSpace: additionalSpaceReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
