import { configureStore } from "@reduxjs/toolkit";

import todoCategorySlice from "./slices/todoCategorySlice";
import todoSlice from "./slices/todoSlice";

const store = configureStore({
  reducer: {
    todo: todoSlice,
    todoCategories: todoCategorySlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
