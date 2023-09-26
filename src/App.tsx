import "@src/App.css";

import GlobalStyle from "@assets/GlobalStyle";
import router from "@src/router";
import store from "@src/store/index";
import theme from "@src/styles/theme";
import Modal from "react-modal";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styled from "styled-components";

Modal.setAppElement("#root");

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

          <RouterProvider router={router} />
        </Provider>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
