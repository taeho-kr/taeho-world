import styled from "styled-components";
import SolarSystem from "../../components/solarSystem";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <SolarSystem />
      <div>main page</div>
      <button onClick={() => navigate("/career")}>career</button>
      <button onClick={() => navigate("/lostark")}>lostark</button>
      <button
        onClick={() =>
          window.open("https://main.d2f3nm5ta023uv.amplifyapp.com/")
        }
      >
        Board.Me
      </button>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Main;
