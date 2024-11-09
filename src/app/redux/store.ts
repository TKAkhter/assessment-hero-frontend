import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer";

const store = configureStore({
  reducer: {
    user: authReducer,
  },
});

export default store;
