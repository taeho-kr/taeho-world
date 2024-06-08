import styled from "styled-components";
import Feed from "./Feed";

const FeedList = () => {
  return <ComponentWrapper>
    <Feed user={{}} feed={{}}/>
  </ComponentWrapper>;
};

const ComponentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

export default FeedList;
