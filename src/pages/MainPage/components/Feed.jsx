import styled from "styled-components";
import { columnBox, rowBox } from "../../../styles";
import ProfileInFeed from "../../../components/ProfileInFeed";
import {
  IconBookmark,
  IconComment,
  IconHeart,
  IconMessage,
  IconThreedot,
} from "../../../assets/icons";

const Feed = ({ user, feed }) => {
  return (
    <ComponentWrapper>
      <FeedHeaderWrapper>
        <ProfileInFeed user={user} />
        <div>{IconThreedot}</div>
      </FeedHeaderWrapper>
      <FeedImageContainer>
        {feed.contents?.map((content) => {
          return content.type === "video" ? (
            <video src={content.src} />
          ) : (
            <img src={content.src} />
          );
        })}
      </FeedImageContainer>
      <FeedInteractionContainer>
        <div>{IconHeart}</div>
        <div>{IconComment}</div>
        <div>{IconMessage}</div>
        <div>{IconBookmark}</div>
      </FeedInteractionContainer>
      <FeedDescriptionContainer>
        {feed.like && <strong>좋아요 {feed.like}개</strong>}
        <FeedLabel>
          <strong>{user.id}</strong>
          <span>{feed.description}</span>
        </FeedLabel>
        <small>6월 8일</small>
      </FeedDescriptionContainer>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  ${columnBox};
  width: 100%;
  height: 100vh;
`;

const FeedHeaderWrapper = styled.div`
  ${rowBox};
  width: 100%;
  height: 56px;
  padding: 0 0.75rem;
  align-items: center;
  justify-content: space-between;
`;

const FeedImageContainer = styled.div`
  ${rowBox};
  width: 100%;
  height: 50vh;
  background-color: blue;
  overflow: hidden;
`;

const FeedInteractionContainer = styled.div`
  ${rowBox};
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  gap: 1rem;

  :last-child {
    margin-left: auto;
  }
`;

const FeedDescriptionContainer = styled.div`
  ${columnBox};
  padding: 0 1rem;

  small {
    margin-top: 0.5rem;
  }
`;

const FeedLabel = styled.div`
  strong {
    margin-right: 0.25rem;
  }
`;

export default Feed;
