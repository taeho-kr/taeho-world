import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import StoryArea from "./components/StoryArea";
import FeedList from "./components/FeedList";
import { columnBox } from "../../styles";

const MainPage = () => {
  return (
    <PageWrapper>
      <Header />
      <StoryArea />
      <FeedListWrapper>
        <FeedList />
      </FeedListWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  ${columnBox};
  width: 100%;
  height: 100%;
  background-color: black;
  position: relative;
  overflow: hidden;
`;

const FeedListWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

export default MainPage;
