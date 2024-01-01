import styled from "styled-components";
import { columnBox } from "../styles/components";
import Clock from "./components/Clock";

const MyBasicInfo = () => {
  return (
    <LayoutWrapper>
      <InfoContainer>
        <span>김태호</span>
        <small>Taeho Kim</small>
        <span>Frontend Engineer</span>
      </InfoContainer>
      <Clock />
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  ${columnBox}
  justify-content: space-between;
  height: 100vh;
  width: 20vw;
`;

const InfoContainer = styled.div`
  ${columnBox}
  padding: 0.5rem;
`;

export default MyBasicInfo;
