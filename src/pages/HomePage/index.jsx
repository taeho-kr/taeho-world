import styled from "styled-components";
import SolarSystem from "./components/SolarSystem";
import { pageBox } from "../../styles/components";

const HomePage = () => {
  return (
    <PageWrapper>
      <SolarSystem />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  ${pageBox}
`;

export default HomePage;
