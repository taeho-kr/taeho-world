import styled from "styled-components";
import Card from "../../../components/Card";
import { columnBox } from "../../../styles/components";

const CareerCard = ({ title, start, end, role, element }) => {
  return (
    <Card>
      <ComponentWrapper>
        <strong>{title}</strong>
        <span>{role}</span>
        <span>
          {start}
          {end}
        </span>
        {element}
      </ComponentWrapper>
    </Card>
  );
};

const ComponentWrapper = styled.div`
  ${columnBox}
  padding: 1rem;
`;

export default CareerCard;
