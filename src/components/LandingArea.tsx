import styled from "styled-components";
import mainImage from "../assets/MainImage.jpg";
import { centerBox, columnBox, rowBox } from "../styles";
import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  // 문이 밀고 들어가는 애니메이션 설정
  const leftDoorStyle = useSpring({
    to: {
      transform: isOpen ? 'translateX(-100%)' : 'translateX(0)',
    },
    config: { duration: 1000 },
  });

  const rightDoorStyle = useSpring({
    to: {
      transform: isOpen ? 'translateX(100%)' : 'translateX(0)',
    },
    config: { duration: 1000 },
  });

  // 화면 밝기 애니메이션 설정
  const brightness = useSpring({
    to: {
      backgroundColor: isOpen ? 'rgba(240, 240, 240, 1)' : 'rgba(240, 240, 240, 0)',
    },
    config: { duration: 1000 },
  });

  // `isOpen` 상태가 `true`로 변경되도록 설정
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  }, []);

  return (
    <animated.div style={brightness}>
      <ComponentWrapper>
        <DoorContainer>
          <Door style={leftDoorStyle} $side="left" />
          <Door style={rightDoorStyle} $side="right" />
        </DoorContainer>
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
    </animated.div>
  );
};

const ComponentWrapper = styled.div`
  ${columnBox}
  position: relative;
  width: 100%;
  height: 100vh;
  color: white;
`;

const DoorContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Door = styled(animated.div)<{ $side: string }>`
  position: absolute;
  width: 50%;
  height: 100%;
  background-color: #fff;
  top: 0;
  left: ${({ $side }) => ($side === 'left' ? '0' : '50%')};
  transform: ${({ $side }) => ($side === 'left' ? 'translateX(0)' : 'translateX(0)')};
  border: 2px solid gold;
  z-index: 1;
`;

const MainImage = styled.div<{ $src: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$src});
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
  border: 1px solid ${({ $type, $color }) => `var(--${$type}-${$color})`};
  background: transparent;
`;

export default LandingArea;
