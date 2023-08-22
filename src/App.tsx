import "@src/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyle from "@assets/GlobalStyle";
import TodoListPage from "@pages/TodoListPage";
import AddTodoPage from "@pages/AddTodoPage";
import UpdateTodoPage from "@pages/UpdateTodoPage";
import store from "@src/store/index";
import { Provider } from "react-redux";

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
    path: "/updateTodo/:id",
    element: <UpdateTodoPage />,
  },
]);

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
