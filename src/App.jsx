import styled from "styled-components";
import Navigation from "./components/Navigation";
import { columnBox } from "./styles";
import { Route, Routes } from "react-router-dom";
import ContentsArea from "./components/ContentsArea";
import MainPage from "./pages/MainPage";
import StoryPage from "./pages/StoryPage";
import { useEffect } from "react";
// import LocationArea from "./components/LocationArea";
import { users } from "./data/users";
import { useSetRecoilState } from "recoil";
import { UsersAtom } from "./store/user";

function App() {
  const setUsers = useSetRecoilState(UsersAtom);

  useEffect(() => {
    checkScreen();
    getUsersData();
  }, []);

  const checkScreen = () => {
    const isMobile = window.innerWidth < 600;

    if (isMobile) {
      if (confirm("전체 화면 모드로 전환하시겠습니까?")) {
        const element = document.documentElement;

        if (element.requestFullscreen) {
          element.requestFullscreen().catch((err) => {
            console.error(
              `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
            );
          });
        } else if (element.mozRequestFullScreen) {
          // Firefox
          element.mozRequestFullScreen().catch((err) => {
            console.error(
              `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
            );
          });
        } else if (element.webkitRequestFullscreen) {
          // Chrome, Safari, Opera
          element.webkitRequestFullscreen().catch((err) => {
            console.error(
              `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
            );
          });
        } else if (element.msRequestFullscreen) {
          // IE/Edge
          element.msRequestFullscreen().catch((err) => {
            console.error(
              `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
            );
          });
        }
      }
    }
  };

  const getUsersData = () => {
    setUsers(users);
  };

  return (
    <AppContainer>
      {/* <LocationArea /> */}
      <ContentsArea>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </ContentsArea>
      <Navigation />
      <StoryPage />
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
