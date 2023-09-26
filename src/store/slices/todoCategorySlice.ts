import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_LOADING_STATE, API_URL } from "@src/constants/Api";
import { DetailedTodoCategory, TodoCategory } from "@src/interfaces/Todo";

const fetchTodoCategories = createAsyncThunk<TodoCategory[]>(
  "todoCategories/fetchTodoCategories",
  async () => {
    const res = await fetch(API_URL + "/categories");
    const result: TodoCategory[] = await res.json();
    return result;
  }
);

const removeCategoryById = createAsyncThunk<void, string>(
  "todoCategories/removeCategory",
  async (categoryId: string) => {
    await fetch(API_URL + "/categories/" + categoryId, {
      method: "DELETE",
    });
  }
);

interface TodoCategoryState {
  todoCategories: DetailedTodoCategory[];
  loading: API_LOADING_STATE;
}

const initialState: TodoCategoryState = {
  todoCategories: [],
  loading: "idle",
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
    builder.addCase(fetchTodoCategories.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(fetchTodoCategories.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchTodoCategories.fulfilled, (state, action) => {
      state.todoCategories = action.payload;
      state.loading = "succeeded";
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
