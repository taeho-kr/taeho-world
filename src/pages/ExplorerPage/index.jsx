import styled from "styled-components";
import { centerBox, columnBox } from "../../styles";

const ExplorerPage = () => {
  const handleClickFeed = () => {};

  return (
    <PageWrapper>
      {new Array(5).fill(0).map((_, g) => (
        <GridContainer key={g} $index={g}>
          {new Array(5).fill(0).map((_, i) => {
            const random = Math.floor(Math.random() * 100) + 200;
            let randomHeight = random;
            if ((g % 2 === 0 && i === 2) || (g % 2 === 1 && i === 0))
              randomHeight *= 2;

            return (
              <GridItem key={i} onClick={() => handleClickFeed()}>
                <img src={`https://picsum.photos/${random}/${randomHeight}`} />
              </GridItem>
            );
          })}
        </GridContainer>
      ))}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  ${columnBox};
  width: 100%;
  height: 100%;
  background-color: black;
  overflow-y: scroll;
  gap: 4px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: repeat(2, 1fr);
  gap: 4px;

  :nth-child(${(props) => (props.$index % 2 ? 1 : 3)}) {
    grid-row: span 2;
    height: calc(66vw + 4px);
  }
`;

const GridItem = styled.div`
  ${centerBox};
  background-color: #f0f0f0;
  height: 33vw;

  * {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
  }
`;

export default ExplorerPage;
