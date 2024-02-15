import styled from "styled-components";

const Card = ({ children }) => {
  return <ComponentWrapper>{children}</ComponentWrapper>;
};

const ComponentWrapper = styled.div`
  border: 1px solid black;
  background-color: white;
  overflow: hidden;
`;

export default Card;
