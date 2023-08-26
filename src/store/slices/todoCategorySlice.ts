import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TodoCategory, DetailedTodoCategory } from "@src/interfaces/Todo";

interface TodoCategoryState {
  todoCategories: DetailedTodoCategory[];
}

const initialState: TodoCategoryState = {
  todoCategories: [],
};

const todoCategories = createSlice({
  name: "todoCategories",
  initialState,
  reducers: {
    initTodoCategories: (state, action: PayloadAction<TodoCategory[]>) => {
      state.todoCategories = action.payload;
    },

    activateTodoCategory: (
      state,
      action: PayloadAction<DetailedTodoCategory>
    ) => {
      const index = state.todoCategories.findIndex((todoCategory) => {
        return todoCategory.id === action.payload.id;
      });

      state.todoCategories[index].isActivated = true;
    },

    deactivateTodoCategory: (
      state,
      action: PayloadAction<DetailedTodoCategory>
    ) => {
      const index = state.todoCategories.findIndex((todoCategory) => {
        return todoCategory.id === action.payload.id;
      });

      state.todoCategories[index].isActivated = false;
    },
  },
});

export const {
  initTodoCategories,
  activateTodoCategory,
  deactivateTodoCategory,
} = todoCategories.actions;
export default todoCategories.reducer;
