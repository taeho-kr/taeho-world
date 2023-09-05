import styled from "styled-components";

const Card = ({ children }) => {
  return <ComponentWrapper>{children}</ComponentWrapper>;
};

const ComponentWrapper = styled.div`
  border-radius: 0.5rem;
  border: 1px solid var(--light-gray);
  box-shadow: 0.0625rem 0.125rem 0.25rem 0.125rem var(--gray);
`;

<<<<<<< HEAD:src/components/card.jsx
export default Card;
=======
export default Card
>>>>>>> 930574ddc75cdaeee6b0b1eed37ac33c554c3939:src/components/Card.jsx
