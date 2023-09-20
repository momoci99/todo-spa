import { ReactComponent as AddTodoIcon } from "@src/assets/ico_add_todo.svg";
import CategoryButton from "@src/components/Common/CategoryButton";
import Page from "@src/components/Common/Page";
import AddTodoButton from "@src/components/TodoListPage/AddTodoButton";
import TodoItem from "@src/components/TodoListPage/TodoItem";
import TodoItemLoader from "@src/components/TodoListPage/TodoItemLoader";
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

const Wrapper = styled.div`
  width: 100%;

  .loading-container {
    font-family: Noto Sans KR;
    font-size: ${(props) => props.theme.fontSizes.medium};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    color: ${(props) => props.theme.colors.neutral.primary};

    display: flex;
    justify-content: center;
    align-items: center;

    white-space: pre-wrap;

    height: 100%;

    > span {
      position: absolute;
      top: 50%;
      text-align: center;
    }
  }

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

  const loading = useSelector((state: RootState) => {
    return state.todo.loading;
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

        {todoList.length === 0 && (
          <section className="loading-container">
            {loading === "loading" ? <TodoItemLoader /> : null}
            {loading === "failed" ? (
              <span>목록을 불러오는데 문제가 발생하였어요.</span>
            ) : null}
            {loading === "succeeded" && todoList.length === 0 ? (
              <span>
                모든 일을 끝냈어요.<br></br>새로운 할일을 만들어보세요!
              </span>
            ) : null}
          </section>
        )}

        {loading === "succeeded" && todoList.length !== 0 && (
          <ul className="todo-list-container">
            {todoList.map((todo) => (
              <TodoItem key={todo.id} todo={todo}></TodoItem>
            ))}
          </ul>
        )}
      </Wrapper>
    </Page>
  );
};

export default TodoListPage;
