import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer/reducer";

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>; // state type 구하기
export type AppDispatch = typeof store.dispatch; // dispatch type

export default store;
