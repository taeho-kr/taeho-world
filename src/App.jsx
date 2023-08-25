//import libraries
import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/header";
import Modal from "./components/modal";
import CareerPage from "./pages/career";
import Lostark from "./pages/lostark";
import Main from "./pages/main";

const App = () => {
  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/lostark/*" element={<Lostark />} />
        <Route path="/career" element={<CareerPage />} />
      </Routes>
      <Modal />
    </AppContainer>
  );
};

const AppContainer = styled.div``;

export default App;
