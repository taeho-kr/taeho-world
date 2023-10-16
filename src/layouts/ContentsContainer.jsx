import styled from "styled-components";

const ContentsContainer = ({ children }) => {
  return <ComponentWrapper>{children}</ComponentWrapper>;
};

const ComponentWrapper = styled.div`
  background-color: var(--primary);
  width: 100vw;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export default ContentsContainer;
