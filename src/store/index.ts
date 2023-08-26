import { configureStore } from "@reduxjs/toolkit";

import todoSlice from "./slices/todoSlice";
import todoCategorySlice from "./slices/todoCategorySlice";

const store = configureStore({
  reducer: {
    todo: todoSlice,
    todoCategories: todoCategorySlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
