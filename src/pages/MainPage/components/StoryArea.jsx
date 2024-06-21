import styled from "styled-components";
import { centerBox, columnBox, rowBox } from "../../../styles";
import useStory from "../../../hooks/useStory";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UsersAtom } from "../../../store/user";

const StoryArea = () => {
  const users = useRecoilValue(UsersAtom);
  const [badges, setBadges] = useState([]);
  const story = useStory();

  useEffect(() => {
    const storedOldStories = localStorage.getItem("sav");
    let oldStories = [];

    if (storedOldStories) {
      oldStories = JSON.parse(storedOldStories);
    }

    const usersHaveStories = users.filter((user) => user.stories.length);
    const newBadges = usersHaveStories.map((user) => ({
      id: user.id,
      image: user.image,
      stories: user.stories.map((story) => ({
        story,
        view: oldStories.includes(story),
      })),
    }));

    newBadges.sort(
      (a, b) =>
        a.stories.filter((story) => story.view).length -
        b.stories.filter((story) => story.view).length
    );

    setBadges(newBadges);
  }, [users]);

  const handleClickBadge = (badge) => {
    const startIndex = badges.indexOf(badge);
    const badgesNext = badges.slice(startIndex);
    story.openStory(badgesNext);
  };

  const isAllViewed = (badge) => badge.stories.every((story) => story.view);

  return (
    <ComponentWrapper>
      <BadgesContainer>
        {badges.map((badge) => (
          <Badge key={badge.id} onClick={() => handleClickBadge(badge)}>
            <BadgeImageContainer>
              <img src={badge.image} />
              <BadgeBorder $view={isAllViewed(badge)} />
            </BadgeImageContainer>
            <UserID $view={isAllViewed(badge)}>{badge.id}</UserID>
          </Badge>
        ))}
      </BadgesContainer>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  width: 100%;
  padding: 8px 0;
  background-color: black;
`;

const BadgesContainer = styled.div`
  ${rowBox};
  align-items: center;
  width: 100%;
  overflow: auto hidden;
  gap: 16px;
  padding: 0 12px;
`;

const Badge = styled.div`
  ${columnBox};
  gap: 0.25rem;
  align-items: center;
  border-radius: 100%;
`;

const BadgeImageContainer = styled.div`
  position: relative;
  ${centerBox};
  width: 80px;
  height: 80px;

  img {
    width: 68px;
    height: 68px;
    border-radius: 100%;
    outline: 3px solid black;
    z-index: 2;
  }
`;

const BadgeBorder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(props) => (props.$view ? "78px" : "80px")};
  height: ${(props) => (props.$view ? "78px" : "80px")};
  transform: translate(-50%, -50%);
  z-index: 1;
  border-radius: 100%;

  background: ${(props) =>
    props.$view
      ? "#444444db"
      : `linear-gradient(
        to bottom left,
        #D300C5,#FE016B,#FFC900
    )`};
`;

const UserID = styled.span`
  color: ${(props) => (props.$view ? "var(--text-disabled)" : "var(--text)")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 64px;
`;

export default StoryArea;
