import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer";
import fileReducer from "./slice";

const store = configureStore({
  reducer: {
    user: authReducer,
    file: fileReducer,
  },
});

export default store;