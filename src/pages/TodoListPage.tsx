import TodoItem from "@src/components/TodoItem";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "@src/store/slices/todoSlice";
import { RootState } from "@src/store";

const TodoListPage = () => {
  const todoList = useSelector((state: RootState) => {
    return state.todo.todoList;
  });
  const dispatch = useDispatch();

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          console.log("새로운 todo 생성 page로 이동");

          dispatch(
            addTodo({
              id: "test-id",
              title: "test-title",
              description: "test-description",
              creationDate: new Date().toISOString(),
              isCompleted: false,
            })
          );
        }}
      >
        새로운 todo 생성하기
      </button>
      {todoList.map((todo) => (
        <TodoItem key={todo.id} todo={todo}></TodoItem>
      ))}
    </div>
  );
};

export default TodoListPage;
