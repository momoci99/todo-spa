import type { PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_LOADING_STATE, API_URL } from "@src/constants/Api";
import { TodoItem } from "@src/interfaces/Todo";

const fetchTodosByCategoryId = createAsyncThunk(
  "todoList/fetchTodosByCategoryId",
  async (categoryId?: string) => {
    let res = undefined;

    if (categoryId) {
      res = await fetch(API_URL + "/todos?categoryIds_like=" + categoryId);
    } else {
      res = await fetch(API_URL + "/todos");
    }

    const result: TodoItem[] = await res.json();
    return result;
  }
);

interface TodoListState {
  todoList: TodoItem[];
  loading: API_LOADING_STATE;
  error: SerializedError | null;
}

const initialState: TodoListState = {
  todoList: [],
  loading: "idle",
  error: null,
};

const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    initTodo: (state, action: PayloadAction<TodoItem[]>) => {
      state.todoList = action.payload;
    },
    addTodo: (state, action: PayloadAction<TodoItem>) => {
      state.todoList.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<TodoItem>) => {
      const index = state.todoList.findIndex((todo) => {
        return todo.id === action.payload.id;
      });

      state.todoList[index] = action.payload;
    },

    removeTodo: (state, action: PayloadAction<string>) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    },

    toggleCompleteStatus: (
      state,
      action: PayloadAction<{
        id: string;
        flag: boolean;
      }>
    ) => {
      const index = state.todoList.findIndex((todo) => {
        return todo.id === action.payload.id;
      });

      state.todoList[index].isCompleted = action.payload.flag;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodosByCategoryId.pending, (state) => {
      state.loading = "loading";
    });

    builder.addCase(fetchTodosByCategoryId.fulfilled, (state, action) => {
      state.todoList = action.payload;
      state.loading = "succeeded";
    });

    builder.addCase(fetchTodosByCategoryId.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error;
    });
  },
});

export { fetchTodosByCategoryId };

export const {
  initTodo,
  addTodo,
  updateTodo,
  removeTodo,
  toggleCompleteStatus,
} = todoSlice.actions;
export default todoSlice.reducer;
