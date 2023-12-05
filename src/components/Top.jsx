import styled from "styled-components";
import { Content, Title, columnBox } from "../styles/components";

const Top = ({ title, description }) => {
  return (
    <ComponentWrapper>
      <Title>{title}</Title>
      {description && <Content>{description}</Content>}
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  ${columnBox}
  gap: 0.5rem;
`;

export default Top;
