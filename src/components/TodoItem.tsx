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
          dispatch(
            toggleCompleteStatus({ id: todo.id, flag: !todo.isCompleted })
          );
        }}
      >
        {todo.isCompleted ? "완료됨" : "진행예정"}
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(removeTodo(todo.id));
        }}
      >
        삭제
      </button>
    </li>
  );
};

export default TodoItem;
