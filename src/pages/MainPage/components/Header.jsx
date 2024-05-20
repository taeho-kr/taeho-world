import styled from "styled-components";
import { centerBox, rowBox } from "../../../styles";
import { IconHeart, IconInstagram, IconMessage } from "../../../assets/icons";
import { useEffect } from "react";

const Header = () => {
  useEffect(() => {}, []);

  return (
    <ComponentWrapper>
      <LogoContainer>{IconInstagram}</LogoContainer>
      <ButtonContainer>
        <Icon>{IconHeart}</Icon>
        <Icon>{IconMessage}</Icon>
      </ButtonContainer>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  ${rowBox}
  width: 100%;
  height: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const LogoContainer = styled.div`
  ${centerBox}
  margin: 0;
  height: 31px;
  padding-top: 4px;
`;

const ButtonContainer = styled.div`
  ${rowBox}
  gap: 16px;
`;

const Icon = styled.div`
  ${centerBox};
  width: 24px;
  height: 24px;
`;
export default Header;
