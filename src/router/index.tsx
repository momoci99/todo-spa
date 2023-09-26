import AddTodoPage from "@pages/AddTodoPage";
import ErrorPage from "@pages/ErrorPage";
import TodoListPage from "@pages/TodoListPage";
import UpdateTodoPage from "@pages/UpdateTodoPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoListPage />,
  },
  {
    path: "/addTodo",
    element: <AddTodoPage />,
  },
  {
    path: "/updateTodo",
    element: <UpdateTodoPage />,
  },
  {
    path: "/updateTodo/:id",
    element: <UpdateTodoPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
