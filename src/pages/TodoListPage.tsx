import TodoItem from "@src/components/TodoItem";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@src/store";

import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

import { initTodo } from "@src/store/slices/todoSlice";
import TodoItemType from "@src/interfaces/TodoItem";

const TodoListPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const todoList = useSelector((state: RootState) => {
    return state.todo.todoList;
  });

  useEffect(() => {
    const fetchTodo = async () => {
      const res = await fetch("http://localhost:3000/todos");
      const json: TodoItemType[] = await res.json();

      dispatch(initTodo(json));
    };

    fetchTodo();
  }, []);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          navigate("/addTodo");
        }}
      >
        +
      </button>
      {todoList.map((todo) => (
        <TodoItem key={todo.id} todo={todo}></TodoItem>
      ))}
    </div>
  );
};

export default TodoListPage;
