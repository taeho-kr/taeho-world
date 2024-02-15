import styled from "styled-components";
import Card from "../../../components/Card";
import Chip from "../../../components/Chip";
import { Caption, columnBox, rowBox } from "../../../styles/components";

const CareerCard = ({ title, role, start, end, stacks, element }) => {
  return (
    <Card>
      <ComponentWrapper>
        <strong>{title}</strong>
        <span>{role}</span>
        <span>
          {start}
          &nbsp;~&nbsp;
          {end}
        </span>
        {stacks && (
          <>
            <small>기술스택</small>
            <StackContainer>
              {stacks.map((stack) => (
                <Chip key={stack}>{stack}</Chip>
              ))}
            </StackContainer>
          </>
        )}
        {element}
      </ComponentWrapper>
    </Card>
  );
};

const ComponentWrapper = styled.div`
  ${columnBox}
  padding: 1rem;
`;

const StackContainer = styled(Caption)`
  ${rowBox}
  gap: 0.5rem;
`;

export default CareerCard;
