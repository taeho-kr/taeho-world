import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import StoryArea from "./components/StoryArea";
import FeedList from "./components/FeedList";
import { columnBox } from "../../styles";

const MainPage = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [scrollTopDifferece, setScrollTopDifference] = useState(0);
  const [heightOfHeader, setHeightOfHeader] = useState(0);
  const [realHeightOfHeader, setRealHeightOfHeader] = useState(0);

  const $headerRef = useRef(null);

  useEffect(() => {
    setRealHeightOfHeader($headerRef.current.clientHeight);
    setHeightOfHeader($headerRef.current.clientHeight);
  }, []);

  useEffect(() => {
    setScrollTopDifference(0);
  }, [scrollDirection]);

  useEffect(() => {
    if (realHeightOfHeader === 0) return;

    let newHeightOfHeader = 0;
    if (scrollDirection === "up") {
      newHeightOfHeader = Math.min(scrollTopDifferece, realHeightOfHeader);
    } else {
      newHeightOfHeader = Math.max(0, realHeightOfHeader - scrollTopDifferece);
    }

    setHeightOfHeader(newHeightOfHeader);
  }, [scrollDirection, scrollTopDifferece]);

  const handleScroll = (event) => {
    setScrollTopDifference(
      (prev) => prev + Math.abs(scrollTop - event.target.scrollTop)
    );
    setScrollTop(event.target.scrollTop);
    if (event.target.scrollTop > scrollTop) {
      if (scrollDirection === "up") setScrollDirection("down");
    } else {
      if (scrollDirection === "down") setScrollDirection("up");
    }
  };

  return (
    <PageWrapper>
      <HeaderWrapper
        ref={$headerRef}
        $height={heightOfHeader - realHeightOfHeader}
        $opacity={heightOfHeader / realHeightOfHeader}
      >
        <Header />
      </HeaderWrapper>
      <FeedListArea
        onScroll={handleScroll}
        $top={heightOfHeader}
        $padding={realHeightOfHeader - heightOfHeader}
      >
        <StoryArea />
        <FeedList />
      </FeedListArea>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  ${columnBox};
  width: 100%;
  height: 100%;
  background-color: black;
`;

const HeaderWrapper = styled.div`
  position: absolute;
  top: ${(props) => props.$height}px;
  opacity: ${(props) => props.$opacity};
  width: 100%;
`;

const FeedListArea = styled.div`
  margin-top: ${(props) => props.$top}px;
  padding-top: ${(props) => props.$padding}px;
  overflow: auto;
`;

export default MainPage;
