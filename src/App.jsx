import styled from "styled-components";
import Navigation from "@/layouts/Navigation";
import ContentsContainer from "@/layouts/ContentsContainer";
import { rowBox } from "@/styles/components";
import { Route, Routes } from "react-router";
import Menu from "@/components/Menu";
import Modal from "@/components/Modal";
import { routes } from "@/routes";

function App() {
  return (
    <AppContainer>
      <Navigation />
      <ContentsContainer>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.route}
              path={route.route}
              element={route.element}
            />
          ))}
        </Routes>
      </ContentsContainer>
      <Menu />
      <Modal />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  ${rowBox};
  width: 100vw;
  height: 100vh;
  position: relative;

  select {
    border: 0;
    outline: 1px solid var(--light-gray);
    padding: 0.25rem 0.5rem;
    font-size: 1rem;

    :disabled {
      color: var(--gray);
    }
  }

  input {
    border: 1px solid var(--light-gray);
    padding: 0.25rem 0.5rem;
    font-size: 1rem;

    :disabled {
      color: var(--gray);
    }
  }
`;

export default App;
