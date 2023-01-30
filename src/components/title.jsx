import styled from "styled-components"

const Title = ({ text, children }) => {
    return (
        <ComponentWrapper>
            {text}{children}
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    font-size: 1.5rem;
`

export default Title