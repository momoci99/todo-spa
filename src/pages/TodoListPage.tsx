import TodoItem from "@src/components/TodoItem";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@src/store";

import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

import { initTodo } from "@src/store/slices/todoSlice";
import {
  activateTodoCategory,
  deactivateTodoCategory,
  initTodoCategories,
} from "@src/store/slices/todoCategorySlice";
import { TodoItem as TodoItemType, TodoCategory } from "@src/interfaces/Todo";

const TodoListPage = () => {
  const dispatch = useDispatch();

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

    const fetchTodoCategories = async () => {
      const res = await fetch("http://localhost:3000/categories");
      const result: TodoCategory[] = await res.json();

      dispatch(initTodoCategories(result));
    };

    fetchTodo();
    fetchTodoCategories();
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
                console.log("asdf");
                if (category.isActivated) {
                  dispatch(deactivateTodoCategory(category));
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
