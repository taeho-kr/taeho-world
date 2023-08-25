import styled from "styled-components";
import SolarSystem from "../../components/solarSystem";

const Main = () => {
  return (
    <PageWrapper>
      <SolarSystem />
      <div>main page</div>
      <a href="/career">career</a>
      <a href="/lostark">lostark</a>
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
