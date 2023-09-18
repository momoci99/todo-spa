import { ReactComponent as AddTodoIcon } from "@src/assets/ico_add_todo.svg";
import CategoryButton from "@src/components/Common/CategoryButton";
import Page from "@src/components/Common/Page";
import AddTodoButton from "@src/components/TodoListPage/AddTodoButton";
import TodoItem from "@src/components/TodoListPage/TodoItem";
import { useAppDispatch } from "@src/hooks/useCustomDispatch";
import { RootState } from "@src/store";
import {
  activateTodoCategory,
  deactivateTodoCategory,
  fetchTodoCategories,
  removeCategoryById,
} from "@src/store/slices/todoCategorySlice";
import { fetchTodosByCategoryId } from "@src/store/slices/todoSlice";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.main`
  .todo-list-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .category-container {
    display: flex;
    padding: 20px 0px;
    gap: 3px;
    align-items: flex-start;

    white-space: nowrap;
    overflow-x: scroll;
  }
`;

const TodoListPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const today = dayjs(new Date()).format("YYYY. MM. DD");
  const [addButtonBlurFlag, setAddButtonBlurFlag] = useState(false);

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

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setAddButtonBlurFlag(true);
    });

    window.addEventListener("scrollend", () => {
      setAddButtonBlurFlag(false);
    });

    return () => {
      window.removeEventListener("scroll", () => {
        setAddButtonBlurFlag(true);
      });

      window.removeEventListener("scrollend", () => {
        setAddButtonBlurFlag(false);
      });
    };
  }, []);

  return (
    <Page title={today}>
      <Wrapper>
        <section className="category-container">
          {todoCategories.map((category) => {
            return (
              <CategoryButton
                showDeleteButton
                name={category.name}
                $backgroundColor={category.backgroundColor}
                key={category.id}
                $isActivated={category.isActivated ? true : false}
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

        <AddTodoButton
          $blurFlag={addButtonBlurFlag}
          onClick={() => {
            navigate("/addTodo");
          }}
        >
          <AddTodoIcon />
        </AddTodoButton>

        <ul className="todo-list-container">
          {todoList.map((todo) => (
            <TodoItem key={todo.id} todo={todo}></TodoItem>
          ))}
        </ul>
      </Wrapper>
    </Page>
  );
};

export default TodoListPage;
