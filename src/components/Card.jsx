import styled from "styled-components";

const Card = ({ children }) => {
  return <ComponentWrapper>{children}</ComponentWrapper>;
};

const ComponentWrapper = styled.div`
  border-radius: 0.5rem;
  border: 1px solid var(--light-gray);
  box-shadow: 0.0625rem 0.125rem 0.25rem 0.125rem var(--gray);
`;

export default Card;
