import TodoItem from "@src/components/TodoItem";
import { useSelector } from "react-redux";

import { RootState } from "@src/store";

import { useNavigate } from "react-router-dom";

const TodoListPage = () => {
  const navigate = useNavigate();

  const todoList = useSelector((state: RootState) => {
    return state.todo.todoList;
  });

  return (
    <div>
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
