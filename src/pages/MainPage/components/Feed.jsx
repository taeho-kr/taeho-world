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
import Carousel from "../../../components/Carousel";

const Feed = ({ user, feed }) => {
  const getFeedDateLabel = (date) => {
    const now = new Date();
    const created = new Date(date);
    const diff = now - created;
    const sec = 1000;
    const min = sec * 60;
    const hour = min * 60;
    const day = hour * 24;
    const week = day * 7;

    if (diff < min) {
      return `${Math.floor(diff / sec)}초 전`;
    } else if (diff < hour) {
      return `${Math.floor(diff / min)}분 전`;
    } else if (diff < day) {
      return `${Math.floor(diff / hour)}시간 전`;
    } else if (diff < week) {
      return `${Math.floor(diff / day)}일 전`;
    } else {
      return `${Math.floor(diff / week)}주 전`;
    }
  };

  return (
    <ComponentWrapper>
      <FeedHeaderWrapper>
        <ProfileInFeed user={user} />
        <div>{IconThreedot}</div>
      </FeedHeaderWrapper>
      <FeedImageContainer>
        <Carousel contents={feed.contents} />
      </FeedImageContainer>
      <FeedInteractionContainer>
        <div>{IconHeart}</div>
        <div>{IconComment}</div>
        <div>{IconMessage}</div>
        <div>{IconBookmark}</div>
      </FeedInteractionContainer>
      <FeedDescriptionContainer>
        {feed.like && <strong>좋아요 {feed.like}개</strong>}
        {feed.description && (
          <FeedLabel>
            <strong>{user.id}</strong>
            <span>{feed.description}</span>
          </FeedLabel>
        )}
        <small>{getFeedDateLabel(feed.createdDatetime)}</small>
      </FeedDescriptionContainer>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  ${columnBox};
  width: 100%;
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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50vh;
  background-color: #0c0c0c;
  overflow: hidden;

  img {
    height: 100%;
  }
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
