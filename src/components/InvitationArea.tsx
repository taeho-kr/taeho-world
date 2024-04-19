import styled from "styled-components";
import { centerBox, columnBox } from "../styles";

const InvitationArea = () => {
  return (
    <ComponentWrapper>
      <strong>초대 말씀</strong>
      <span>
        저희들의 오늘이 있기까지 보내주신 <br />
        따뜻한 사랑과 깊은 관심에 진심으로 감사드립니다. <br />
        <br />
        저희 두 사람은 여러분의 축복을 받으며 <br />
        새로운 길로 나아가려 합니다. <br />
        <br />
        저희가 하나가 되는 자리에서
        <br />
        함께 웃으며 행복을 나누고자 합니다.
      </span>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  ${centerBox}
  ${columnBox}
  width: 100%;
  height: 100vh;
  gap: 1.5rem;
  line-height: 1.75;

  strong {
    font-size: 1.25rem;
  }

  span {
    font-size: 0.8rem;
    text-align: center;
  }
`;

export default InvitationArea;
