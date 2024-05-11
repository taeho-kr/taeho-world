import styled from "styled-components";

const Feed = () => {
  return (
    <ComponentWrapper>
      <FeedHeaderWrapper></FeedHeaderWrapper>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const FeedHeaderWrapper = styled.div`
  width: 100%;
  height: 56px;
`;

export default Feed;
