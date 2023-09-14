import TodoItem from "@src/components/TodoListPage/TodoItem";
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
  removeCategoryById,
} from "@src/store/slices/todoCategorySlice";

import CategoryButton from "@src/components/CategoryButton";

import styled from "styled-components";

const Wrapper = styled.div`
  .todo-list-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

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
    <Wrapper>
      <section
        style={{
          display: "flex",
        }}
      >
        {todoCategories.map((category) => {
          return (
            <CategoryButton
              showDeleteButton
              name={category.name}
              key={category.id}
              isActivated={category.isActivated ? true : false}
              onClickHandler={() => {
                if (category.isActivated) {
                  dispatch(deactivateTodoCategory());
                } else {
                  dispatch(activateTodoCategory(category));
                }
              }}
              onDeleteButtonClickHandler={() => {
                dispatch(removeCategoryById(category.id));
                dispatch(fetchTodoCategories());
              }}
            ></CategoryButton>
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

      <ul className="todo-list-container">
        {todoList.map((todo) => (
          <TodoItem key={todo.id} todo={todo}></TodoItem>
        ))}
      </ul>
    </Wrapper>
  );
};

export default TodoListPage;
