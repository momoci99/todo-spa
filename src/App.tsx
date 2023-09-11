import "@src/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyle from "@assets/GlobalStyle";
import TodoListPage from "@pages/TodoListPage";
import AddTodoPage from "@pages/AddTodoPage";
import UpdateTodoPage from "@pages/UpdateTodoPage";
import store from "@src/store/index";
import { Provider } from "react-redux";

import GlobalFontStyle from "@src/fonts/fonts";

import { ThemeProvider } from "styled-components";
import theme from "@src/styles/theme";

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
    <ThemeProvider theme={theme}>
      <div className="app">
        <Provider store={store}>
          <GlobalStyle />
          <GlobalFontStyle />
          <RouterProvider router={router} />
        </Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
