import styled from "styled-components";

const Chip = ({ children }) => {
  return <ComponentWrapper>{children}</ComponentWrapper>;
};

const ComponentWrapper = styled.div`
  padding: 0.25rem 0.75rem;
  border: 1px solid gray;
  width: fit-content;
  height: fit-content;
`;

export default Chip;
