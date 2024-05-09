import styled from "styled-components";
import { centerBox, columnBox, rowBox } from "../../../styles";
import th from "../../../assets/images/th_instagram.jpg";
import ye from "../../../assets/images/ye_instagram.jpg";

const StoryArea = () => {
  const badges = [
    {
      id: 1,
      title: "taeho._.world",
      image: th,
      stories: [
        {
          url: "https://www.instagram.com/stories/_sis.chloey_/3363087535855940219/?hl=kr",
          view: false,
        },
      ],
    },
    {
      id: 2,
      title: "_sis.chloey_",
      image: ye,
      stories: [
        {
          url: "https://www.instagram.com/stories/_sis.chloey_/3363087535855940219/?hl=kr",
          view: false,
        },
      ],
    },
    {
      id: 3,
      title: "premierleague",
      image: "https://via.placeholder.com/150",
      stories: [
        {
          url: "https://www.instagram.com/stories/_sis.chloey_/3363087535855940219/?hl=kr",
          view: true,
        },
      ],
    },
    {
      id: 4,
      title: "Badge4",
      image: "https://via.placeholder.com/150",
      stories: [
        {
          url: "https://www.instagram.com/stories/_sis.chloey_/3363087535855940219/?hl=kr",
          view: true,
        },
      ],
    },
    {
      id: 5,
      title: "Badge 5",
      image: "https://via.placeholder.com/150",
      stories: [
        {
          url: "https://www.instagram.com/stories/_sis.chloey_/3363087535855940219/?hl=kr",
          view: true,
        },
      ],
    },
  ];

  const handleClickBadge = (badge) => {
    console.log(badge);
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
            <UserID $view={badge.view}>{badge.title}</UserID>
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
  height: 85px;
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
  width: 66px;
  height: 66px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 100%;
    outline: 2px solid black;
    z-index: 2;
  }
`;

const BadgeBorder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(props) => (props.$view ? "63px" : "65px")};
  height: ${(props) => (props.$view ? "63px" : "65px")};
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
