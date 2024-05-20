import styled from "styled-components";
import Header from "./components/Header";
import StoryArea from "./components/StoryArea";
import FeedList from "./components/FeedList";

const MainPage = () => {
  return (
    <PageWrapper>
      <Header />
      <StoryArea />
      <FeedList />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`;

export default MainPage;
