import { useState } from "react";
import { TodoItem as TodoItemType } from "@src/interfaces/Todo";

import { useSelector } from "react-redux";

import { RootState } from "@src/store";
import Card from "@src/components/Common/Card";

import styled from "styled-components";

import MoreButton from "@src/components/MoreButton";

import TodoItemMoreMenu from "@src/components/TodoListPage/TodoItemMoreMenu";

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
  }

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
`;

const TodoItem = ({ todo }: { todo: TodoItemType }) => {
  const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);

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
      >
        <span>{todo.description}</span>

        <div>
          <span>{todo.creationDate}</span>
          <span>{todo.isCompleted}</span>
          카테고리
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
        </div>
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
