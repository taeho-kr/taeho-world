import styled from "styled-components";

const ContentsArea = ({ children }) => {
  return <ComponentWrapper>{children}</ComponentWrapper>;
};

const ComponentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default ContentsArea;
