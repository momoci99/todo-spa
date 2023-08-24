import TodoItemType from "@src/interfaces/TodoItem";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeTodo, toggleCompleteStatus } from "@src/store/slices/todoSlice";

const TodoItem = ({ todo }: { todo: TodoItemType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <li>
      <span>{todo.title}</span>
      <span>{todo.description}</span>
      <span>{todo.creationDate}</span>
      <span>{todo.isCompleted}</span>

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
                toggleCompleteStatus({ id: todo.id, flag: !todo.isCompleted })
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
    </li>
  );
};

export default TodoItem;
