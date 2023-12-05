import styled from "styled-components";
import { columnBox, pageBox } from "../../styles/components";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Chip from "../../components/Chip";

const DesignSystemPage = () => {
  return (
    <PageWrapper>
      <Button>Button</Button>
      <Card>Card</Card>
      <Chip>Chip</Chip>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  ${pageBox}
  ${columnBox}
`;

export default DesignSystemPage;
