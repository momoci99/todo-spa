import "@src/App.css";

import GlobalStyle from "@assets/GlobalStyle";
import AddTodoPage from "@pages/AddTodoPage";
import TodoListPage from "@pages/TodoListPage";
import UpdateTodoPage from "@pages/UpdateTodoPage";
import GlobalFontStyle from "@src/fonts/fonts";
import store from "@src/store/index";
import theme from "@src/styles/theme";
import Modal from "react-modal";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";

Modal.setAppElement("#root");

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

const Wrapper = styled.main`
  height: 100%;
  justify-content: center;
  align-items: center;

  position: relative;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper className="app">
        <Provider store={store}>
          <GlobalStyle />
          <GlobalFontStyle />
          <RouterProvider router={router} />
        </Provider>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
