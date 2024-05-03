import styled from "styled-components";
import Navigation from "./components/Navigation";
import { columnBox } from "./styles";
import { Route, Routes } from "react-router-dom";
import ContentsArea from "./components/ContentsArea";
import MainPage from "./pages/MainPage";
// import LocationArea from "./components/LocationArea";


function App() {

  return (
    <AppContainer>
      {/* <LocationArea /> */}
      <ContentsArea>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </ContentsArea>
      <Navigation />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  background-color: black;
  ${columnBox};
  min-width: 360px;
  width: 100vw;
  max-width: 600px;
  height: 100vh;
`;

export default App;
