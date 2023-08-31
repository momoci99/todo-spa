import TodoItem from "@src/components/TodoItem";
import { useSelector } from "react-redux";

import { RootState } from "@src/store";

import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

import { fetchTodosByCategoryId } from "@src/store/slices/todoSlice";

import { useAppDispatch } from "@src/hooks/useCustomDispatch";
import {
  activateTodoCategory,
  deactivateTodoCategory,
  fetchTodoCategories,
} from "@src/store/slices/todoCategorySlice";

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
    dispatch(fetchTodoCategories());
  }, []);

  useEffect(() => {
    const activatedCategory = todoCategories.find(
      (category) => category.isActivated
    );

    if (activatedCategory) {
      dispatch(fetchTodosByCategoryId(activatedCategory.id));
    } else {
      dispatch(fetchTodosByCategoryId(""));
    }
  }, [todoCategories]);

  return (
    <div>
      <section>
        {todoCategories.map((category) => {
          return (
            <button
              key={category.id}
              style={{
                backgroundColor: category.isActivated ? "blue" : "",
              }}
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
