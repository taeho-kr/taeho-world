import styled from "styled-components";
import { centerBox, columnBox, rowBox } from "../styles";
import invitationImage from "../assets/InvitationImage.jpg";

const InvitationArea = () => {
  return (
    <ComponentWrapper>
      <InvitationText>
        <strong>초대 말씀</strong>
        <span>
          저희들의 오늘이 있기까지 <br />
          보내주신 따뜻한 사랑과 깊은 관심에 <br />
          진심으로 감사드립니다. <br />
          <br />
          저희 두 사람은 여러분의 축복을 받으며 <br />
          새로운 길로 나아가려 합니다. <br />
          <br />
          저희가 하나가 되는 자리에서
          <br />
          함께 웃으며 행복을 나누고자 합니다.
        </span>
      </InvitationText>
      <InfoArea>
        <Line>
          <span>이완주</span>
          <Dot />
          <span>최윤정</span>
          <small>의 장녀</small> <strong>용은</strong>
        </Line>
        <Line>
          <span>김용택</span>
          <Dot />
          <span>김모선</span>
          <small>의 장남</small> <strong>태호</strong>
        </Line>
      </InfoArea>
      <InvitationImageContainer>
        <InvitationImage src={invitationImage} />
        <Cover />
      </InvitationImageContainer>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  ${centerBox}
  ${columnBox}
  gap: 1rem;

  justify-content: space-between;
  width: 100%;
  height: 100vh;
`;

const InvitationText = styled.div`
  ${centerBox}
  ${columnBox}
  
  padding: 3rem;
  padding-bottom: 1rem;
  gap: 1.5rem;

  strong {
    font-size: 1.25rem;
    border-bottom: 2px solid var(--primary-gold);
  }

  span {
    text-align: center;
  }
`;

const InfoArea = styled.div`
  ${columnBox}
  gap:0.5rem;
`;

const Line = styled.div`
  ${rowBox}
  ${centerBox}
  align-items: center;
  gap: 0.25rem;

  span {
    width: 3rem;
    text-align: center;
  }
`;

const InvitationImageContainer = styled.div`
  width: 100%;
  height: 35%;
  position: relative;
`;

const InvitationImage = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  align-self: flex-end;
`;

const Cover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: #0000007a;
`;

const Dot = styled.div`
  width: 0.25rem;
  height: 0.25rem;
  background-color: var(--primary-gold);
  border-radius: 100%;
`;

export default InvitationArea;
