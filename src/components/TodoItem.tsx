import TodoItemType from "@src/interfaces/TodoItem";

const TodoItem = ({ todo }: { todo: TodoItemType }) => {
  return (
    <li>
      <span>{todo.title}</span>
      <span>{todo.description}</span>
      <span>{todo.creationDate}</span>
      <span>{todo.isCompleted}</span>
    </li>
  );
};

export default TodoItem;
