import "@src/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyle from "@assets/GlobalStyle";
import TodoListPage from "@pages/TodoListPage";
import AddTodoPage from "@pages/AddTodoPage";
import UpdateTodoPage from "@pages/UpdateTodoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoListPage />,
  },
  {
    path: "/addTodo/:id",
    element: <AddTodoPage />,
  },
  {
    path: "/updateTodo/:id",
    element: <UpdateTodoPage />,
  },
]);

function App() {
  return (
    <div className="app">
      <GlobalStyle />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
