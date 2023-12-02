import styled from "styled-components";
import { columnBox } from "../styles/components";
import Clock from "./components/Clock";

const MyBasicInfo = () => {
  return (
    <LayoutWrapper>
        <div></div>
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

export default MyBasicInfo;
