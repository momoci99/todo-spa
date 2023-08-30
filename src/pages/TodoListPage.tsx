import TodoItem from "@src/components/TodoItem";
import { useSelector } from "react-redux";

import { RootState } from "@src/store";

import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

import { initTodo } from "@src/store/slices/todoSlice";

import { useAppDispatch } from "@src/hooks/useCustomDispatch";
import {
  activateTodoCategory,
  deactivateTodoCategory,
  fetchTodoCategories,
} from "@src/store/slices/todoCategorySlice";
import { TodoItem as TodoItemType } from "@src/interfaces/Todo";

const TodoListPage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const todoList = useSelector((state: RootState) => {
    return state.todo.todoList;
  });

  const todoCategories = useSelector((state: RootState) => {
    return state.todoCategories.todoCategories;
  });

  useEffect(() => {
    const fetchTodo = async () => {
      const res = await fetch("http://localhost:3000/todos");
      const result: TodoItemType[] = await res.json();

      dispatch(initTodo(result));
    };

    fetchTodo();
    dispatch(fetchTodoCategories());
  }, []);

  return (
    <div>
      <section>
        {todoCategories.map((category) => {
          return (
            <button
              key={category.id}
              className={category.isActivated ? "isActivated" : ""}
              onClick={() => {
                if (category.isActivated) {
                  dispatch(deactivateTodoCategory());
                } else {
                  dispatch(activateTodoCategory(category));
                }
              }}
            >
              {category.name}
            </button>
          );
        })}
      </section>

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
