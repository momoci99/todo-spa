import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import TodoItem from "@src/interfaces/TodoItem";

interface TodoListState {
  todoList: TodoItem[];
}

const initialState: TodoListState = {
  todoList: [],
};

const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
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
  },
});

export const { addTodo, updateTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;