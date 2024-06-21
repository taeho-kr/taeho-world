import styled from "styled-components";
import { centerBox } from "../styles";
import useStory from "../hooks/useStory";

const ProfileInFeed = ({ user = {} }) => {
  const story = useStory();

  const handleClickBadge = () => {
    story.openStory([user]);
  };

  return (
    <ProfileContainer>
      <BadgeImageContainer onClick={handleClickBadge}>
        <img src={user.image} />
        {user.stories?.some((story) => !story.view) && <BadgeBorder />}
      </BadgeImageContainer>
      <ProfileInfo>
        <span>{user.id}</span>
      </ProfileInfo>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BadgeImageContainer = styled.div`
  position: relative;
  ${centerBox};
  width: 42px;
  height: 42px;

  img {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    outline: 2px solid black;
    z-index: 2;
    background-color: #323232;
  }
`;

const BadgeBorder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 41px;
  height: 41px;
  transform: translate(-50%, -50%);
  z-index: 1;
  border-radius: 100%;
  background: linear-gradient(to bottom left, #d300c5, #fe016b, #ffc900);
`;

const ProfileInfo = styled.div`
  margin-left: 8px;
`;

export default ProfileInFeed;
