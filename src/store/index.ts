import { configureStore } from "@reduxjs/toolkit";

import todoSlice from "./slices/todoSlice";

const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
