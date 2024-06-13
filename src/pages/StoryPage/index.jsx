import { useRecoilState } from "recoil";
import styled from "styled-components";
import { StoriesAtom } from "../../store/story";
import useStory from "../../hooks/useStory";
import { useEffect, useState } from "react";
import ProfileInFeed from "../../components/ProfileInFeed";
import { rowBox } from "../../styles";

const StoryPage = () => {
  const story = useStory();
  const [stories, setStories] = useRecoilState(StoriesAtom);
  const [userIndex, setUserIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);

  useEffect(() => {
    setUserIndex(0);
    const newStoryIndex = stories?.users[userIndex]?.stories.findIndex(
      (story) => !story.view
    );
    setStoryIndex(newStoryIndex);
  }, [stories]);

  return (
    <PageWrapper $show={stories.show}>
      <HeaderContainer>
        <ProfileInFeed user={stories?.users[userIndex]} />
        <div onClick={() => story.closeStory()}>x</div>
      </HeaderContainer>
      {stories.users[userIndex]?.stories[storyIndex] && (
        <img src={stories?.users[userIndex]?.stories[storyIndex]?.story} />
      )}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: absolute;
  z-index: 9999;
  display: ${(props) => (props.$show ? "block" : "none")};
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--background);
  color: var(--text);
`;

const HeaderContainer = styled.div`
  ${rowBox};
  align-items: center;
  justify-content: space-between;
`;

export default StoryPage;
