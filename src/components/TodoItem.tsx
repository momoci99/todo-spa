import { TodoItem as TodoItemType } from "@src/interfaces/Todo";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, toggleCompleteStatus } from "@src/store/slices/todoSlice";
import { RootState } from "@src/store";
import Card from "@src/components/Card";

import styled from "styled-components";

const Wrapper = styled.li`
  list-style: none;

  display: flex;
  flex-direction: column;
  justify-content: center;

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const todoCategories = useSelector((state: RootState) => {
    return state.todoCategories.todoCategories;
  });

  return (
    <Wrapper>
      <Card header={<p className="title">{todo.title}</p>}>
        <span>{todo.description}</span>

        <div>
          <span>{todo.creationDate}</span>
          <span>{todo.isCompleted}</span>
          카테고리
          <ul>
            {todo.categoryIds.map((id) => {
              return (
                <li key={id}>
                  {todoCategories.find((category) => category.id === id)?.name}
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => {
              navigate(`/updateTodo/${todo.id}`);
            }}
          >
            수정하기
          </button>
          <button
            type="button"
            onClick={() => {
              if (!todo) return;
              fetch(`http://localhost:3000/todos/${todo.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: todo.id,
                  title: todo.title,
                  description: todo.description,
                  creationDate: todo.creationDate,
                  isCompleted: !todo.isCompleted,
                }),
              })
                .then(() => {
                  dispatch(
                    toggleCompleteStatus({
                      id: todo.id,
                      flag: !todo.isCompleted,
                    })
                  );
                })
                .catch((reason) => {
                  console.error(reason);
                });
            }}
          >
            {todo.isCompleted ? "완료됨" : "진행예정"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (!todo) return;
              fetch(`http://localhost:3000/todos/${todo.id}`, {
                method: "DELETE",
              })
                .then(() => {
                  dispatch(removeTodo(todo.id));
                })
                .catch((reason) => {
                  console.error(reason);
                });
            }}
          >
            삭제
          </button>
        </div>
      </Card>
    </Wrapper>
  );
};

export default TodoItem;
