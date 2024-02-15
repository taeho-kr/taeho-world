import styled from "styled-components";
import { columnBox } from "../../../styles/components";
import Button from "../../../components/Button";

const Deepixel = () => {
  return (
    <ComponentWrapper>
      <h4>사내 유일한 Frontend Engineer</h4>
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

export default Deepixel;
