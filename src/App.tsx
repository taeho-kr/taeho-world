import styled from "styled-components";
import LandingArea from "./components/LandingArea";
import { useEffect, useRef, useState } from "react";
import InvitationArea from "./components/InvitationArea";

const getDifferenceOfDay = (from: Date, to: Date) => {
  const difference = from.getTime() - to.getTime();
  const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

  return daysDifference;
};

function App() {
  const weddingDateTime = "2025-10-25 13:00";
  const weddingDateObject = new Date(weddingDateTime);
  const [dDay, setDday] = useState<number>(
    getDifferenceOfDay(weddingDateObject, new Date())
  );
  const $startY = useRef<number>(0);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    setInterval(calculateDDay, 999);
    addScrollEvent();
  };

  const calculateDDay = () => {
    const now = new Date();
    const daysDifference = getDifferenceOfDay(weddingDateObject, now);
    setDday(daysDifference); // 상태 업데이트

    return daysDifference;
  };

  const addScrollEvent = () => {
    document.addEventListener("wheel", scrollEvent, { passive: false });
    document.addEventListener("touchstart", touchStartEvent);
    document.addEventListener("touchend", touchEndEvent);
  };

  const scrollEvent = (event: any) => {
    const scrollAmount = window.innerHeight;

    if (event.deltaY > 0) {
      window.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      });
    } else if (event.deltaY < 0) {
      window.scrollBy({
        top: -scrollAmount,
        behavior: "smooth",
      });
    }

    event.preventDefault();
  };

  const touchStartEvent = (event: any) => {
    $startY.current = event.touches[0].clientY;
  };

  const touchEndEvent = (event: any) => {
    // 터치가 끝나면 Y 위치 차이를 계산합니다.
    const endY = event.changedTouches[0].clientY;
    const deltaY = $startY.current - endY;

    // 스크롤 방향 및 양을 확인합니다.
    const scrollAmount = window.innerHeight; // 100vh 크기를 나타냅니다.

    if (deltaY > 0) {
      // 아래로 스크롤할 때
      window.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      });
    } else if (deltaY < 0) {
      // 위로 스크롤할 때
      window.scrollBy({
        top: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <AppContainer>
      <LandingArea
        dDay={dDay}
        weddingDateTime={weddingDateTime}
        weddingDateObject={weddingDateObject}
      />
      <InvitationArea />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  background-color: var(--primary-white);
  width: 100vw;
  max-width: 900px;
`;

export default App;
