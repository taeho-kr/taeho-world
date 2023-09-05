import styled from "styled-components";

const Chip = ({ children }) => {
  return <ComponentWrapper>{children}</ComponentWrapper>;
};

const ComponentWrapper = styled.div`
  background-color: var(--primary);
  color: var(--primaryText);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  border: 1px solid var(--gray);
  width: fit-content;
  height: fit-content;
`;

export default Chip;
