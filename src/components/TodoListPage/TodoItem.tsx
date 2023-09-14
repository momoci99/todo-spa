import { useState } from "react";
import { TodoItem as TodoItemType } from "@src/interfaces/Todo";

import { useSelector } from "react-redux";

import { RootState } from "@src/store";
import Card from "@src/components/Common/Card";

import styled from "styled-components";

import MoreButton from "@src/components/MoreButton";

import TodoItemMoreMenu from "@src/components/TodoListPage/TodoItemMoreMenu";

import { useDataFormatter } from "@src/hooks/useDataFormatter";

const Wrapper = styled.li`
  list-style: none;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .header-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0px 16px 0px 16px;

    .title {
      color: ${(props) => {
        return props.theme.colors.neutral.white;
      }};

      font-family: Noto Sans KR;
      font-size: ${(props) => {
        return props.theme.fontSizes.small;
      }};

      font-weight: ${(props) => {
        return props.theme.fontWeights.light;
      }};
      line-height: normal;
    }
  }

  .body-container {
    padding: 16px;

    min-height: 40px;
    max-height: 60px;
    width: 400px;

    border-radius: 8px;

    text-overflow: ellipsis;
    white-space: pre-wrap;
    overflow-x: hidden;
    overflow-y: scroll;

    font-family: Noto Sans KR;
    font-size: ${(props) => {
      return props.theme.fontSizes.small;
    }};
  }

  .splitter {
    margin: 0 16px;
    height: 1px;

    background-color: ${(props) => {
      return props.theme.colors.neutral.line;
    }};
  }

  .footer-container {
    display: flex;
    justify-content: space-between;

    padding: 16px;

    font-family: Noto Sans KR;
    font-size: ${(props) => {
      return props.theme.fontSizes.small;
    }};
    font-weight: ${(props) => {
      return props.theme.fontWeights.medium;
    }};
    color: ${(props) => {
      return props.theme.colors.neutral.secondary;
    }};
  }
`;

const TodoItem = ({ todo }: { todo: TodoItemType }) => {
  const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);

  const { convertDate } = useDataFormatter();

  const todoCategories = useSelector((state: RootState) => {
    return state.todoCategories.todoCategories;
  });

  return (
    <Wrapper>
      <Card
        header={
          <div className="header-container">
            <span className="title">{todo.title}</span>
            <MoreButton
              onClickHandler={() => {
                //모달창 표시
                setMenuModalIsOpen(true);
              }}
            ></MoreButton>
          </div>
        }
        footer={
          <>
            <div className="splitter"></div>
            <div className="footer-container">
              {/* <span>{todo.isCompleted}</span> */}

              <ul>
                {todo.categoryIds &&
                  todo.categoryIds.map((id) => {
                    return (
                      <li key={id}>
                        {
                          todoCategories.find((category) => category.id === id)
                            ?.name
                        }
                      </li>
                    );
                  })}
              </ul>

              <span>{convertDate(todo.creationDate)}</span>
            </div>
          </>
        }
      >
        <div className="body-container">{todo.description}</div>

        <TodoItemMoreMenu
          isOpen={menuModalIsOpen}
          onClose={() => {
            setMenuModalIsOpen(false);
          }}
          todo={todo}
        ></TodoItemMoreMenu>
      </Card>
    </Wrapper>
  );
};

export default TodoItem;
