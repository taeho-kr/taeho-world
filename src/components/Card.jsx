import styled from "styled-components";

const Card = ({ children }) => {
  return <ComponentWrapper>{children}</ComponentWrapper>;
};

const ComponentWrapper = styled.div`
  border-radius: 1rem;
  border: 1px solid var(--light-gray);
  box-shadow: 0.0625rem 0.125rem 0.25rem 0.125rem var(--gray);
  overflow: hidden;
`;

export default Card;
