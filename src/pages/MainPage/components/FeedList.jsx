import styled from "styled-components";
import Feed from "./Feed";
import { users } from "../../../data/users";
import { feeds } from "../../../data/feeds";
import { columnBox } from "../../../styles";

const FeedList = () => {
  return (
    <ComponentWrapper>
      {feeds.map((feed) => {
        return (
          <Feed
            key={feed.id}
            user={users.filter((u) => u.id === feed.userID)[0]}
            feed={feed}
          />
        );
      })}
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  ${columnBox};
  gap: 1rem;
  width: 100%;
  height: 100%;
  padding-bottom: calc(48px + 10px); //48: height of navigation
  overflow: scroll;
`;

export default FeedList;
