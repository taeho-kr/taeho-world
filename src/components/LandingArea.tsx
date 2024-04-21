import styled from "styled-components";
import mainImage from "../assets/MainImage.jpg";
import { centerBox, columnBox, rowBox } from "../styles";

interface ILandingArea {
  dDay: number;
  weddingDateTime: string;
  weddingDateObject: Date;
}

const LandingArea = ({
  dDay,
  weddingDateTime,
  weddingDateObject,
}: ILandingArea) => {
  const borders = [2.5, 3];

  return (
    <ComponentWrapper>
      <MainImage $src={mainImage} />
      <MainLabel>
        <DateContainer>
          <strong>
            {weddingDateObject.getMonth() + 1}.{weddingDateObject.getDate()}
          </strong>
        </DateContainer>
        <span>결혼합니다.</span>
      </MainLabel>
      <SubLabel>
        <strong>{weddingDateTime}</strong>
        <small>{dDay !== 0 ? `D${dDay * -1}` : "Wedding Day!"}</small>
        <br />
        <strong>더 라움</strong>
      </SubLabel>
      {borders.map((el) => (
        <Border
          key={JSON.stringify(el)}
          $padding={el}
          $type="primary"
          $color="white"
        />
      ))}
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  ${columnBox}
  position: relative;
  width: 100%;
  height: 100vh;
  color: white;
`;

const MainImage = styled.div<{ $src: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  border: 1px solid var(--primary-white);
`;

const MainLabel = styled.div`
  ${centerBox}
  ${rowBox}
  gap: 1.5rem;
  position: absolute;
  top: 5rem;
  width: 100%;
  padding-left: 0.5rem;
  text-align: center;
  text-shadow: 0 0 0.3rem black;
  font-size: 4vh;
  align-items: center;
`;

const DateContainer = styled.div`
  ${columnBox}
`;

const SubLabel = styled.div`
  ${centerBox}
  ${columnBox}
  position: absolute;
  bottom: 4.5rem;
  width: 100%;
  text-align: center;
  text-shadow: 0 0 0.3rem black;
  font-size: 1rem;
`;

const Border = styled.div<{ $padding: number; $type: string; $color: string }>`
  position: absolute;
  width: calc(100% - ${(props) => props.$padding}rem);
  height: calc(100% - ${(props) => props.$padding}rem);
  margin: ${(props) => props.$padding / 2}rem;
  border: 1px solid ${(props) => `var(--${props.$type}-${props.$color})`};
  background: transparent;
`;

export default LandingArea;
