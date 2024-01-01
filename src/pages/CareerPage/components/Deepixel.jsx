import styled from "styled-components";
import { Caption, columnBox, rowBox } from "../../../styles/components";
import Button from "../../../components/Button";
import Chip from "../../../components/Chip";

const Deepixel = () => {
  const stacks = [
    "Vue.js",
    "Vuetify",
    "Vuex",
    "Node.js",
    "MySQL",
    "OpenGL",
    "JQuery",
  ];

  return (
    <ComponentWrapper>
      <h4>사내 유일한 Frontend Engineer</h4>
      <small>기술 스택</small>
      <StackContainer>
        {stacks.map((stack) => (
          <Chip key={stack}>{stack}</Chip>
        ))}
      </StackContainer>
      <Button onClick={() => window.open("https://stylear.ai/")}>
        Try StyleAR
      </Button>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  ${columnBox}
  gap: 0.5rem;
`;

const StackContainer = styled(Caption)`
  ${rowBox}
  gap: 0.5rem;
`;

export default Deepixel;
