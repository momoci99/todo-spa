import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DetailedTodoCategory, TodoCategory } from "@src/interfaces/Todo";

const fetchTodoCategories = createAsyncThunk<TodoCategory[]>(
  "todoCategories/fetchTodoCategories",
  async () => {
    const res = await fetch("http://localhost:3000/categories");
    const result: TodoCategory[] = await res.json();
    return result;
  }
);

const removeCategoryById = createAsyncThunk<void, string>(
  "todoCategories/removeCategory",
  async (categoryId: string) => {
    await fetch("http://localhost:3000/categories/" + categoryId, {
      method: "DELETE",
    });
  }
);

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
      state.todoCategories.forEach((category) => {
        category.isActivated = category.id === action.payload.id;
      });
    },

    deactivateTodoCategory: (state) => {
      state.todoCategories.forEach((category) => {
        category.isActivated = false;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoCategories.fulfilled, (state, action) => {
      state.todoCategories = action.payload;
    });
  },
});

export { fetchTodoCategories, removeCategoryById };

export const {
  initTodoCategories,
  activateTodoCategory,
  deactivateTodoCategory,
} = todoCategories.actions;
export default todoCategories.reducer;
