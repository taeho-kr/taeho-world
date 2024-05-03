import styled from "styled-components"
import { centerBox, rowBox } from "../../../styles"
import { IconHeart, IconInstagram, IconMessage } from "../../../assets/icons"

const Header = () => {
    return (
        <ComponentWrapper>
            <ContentsContainer>
                <LogoContainer>
                    {IconInstagram}
                </LogoContainer>
                <ButtonContainer>
                    <Icon>
                        {IconHeart}
                    </Icon>
                    <Icon>
                        {IconMessage}
                    </Icon>
                </ButtonContainer>
            </ContentsContainer>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    width: 100%;
    padding: 0 16px;
`

const ContentsContainer = styled.div`
    ${rowBox}
    width: 100%;
    height: 44px;
    min-height: 44px;
    align-items: center;
    justify-content: space-between;
`

const LogoContainer = styled.div`
    ${centerBox}
    margin: 0;
    flex-grow: 1;
    flex-shrink: 1;
    text-align: left;
    height:31px;
    margin-top: 1px;
`

const ButtonContainer = styled.div`
    ${rowBox}
    gap: 16px;
`

const Icon = styled.div`
    ${centerBox};
    width: 24px;
    height: 24px;
`
export default Header
