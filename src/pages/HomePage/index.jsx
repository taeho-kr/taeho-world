import styled from "styled-components";
import { pageBox } from "@/styles/components";
import SolarSystem from "@/pages/HomePage/components/SolarSystem";

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
