import { useRecoilState } from "recoil";
import styled from "styled-components";
import { StoriesAtom } from "../../store/story";
import useStory from "../../hooks/useStory";
import { useEffect, useState } from "react";
import ProfileInFeed from "../../components/ProfileInFeed";

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
      <div onClick={story.closeStory}>Close</div>
      <ProfileInFeed user={stories?.users[userIndex]} />
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

export default StoryPage;
