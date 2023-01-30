import styled from "styled-components"

const Button = ({ size = "medium", text, color = "primary", onClick }) => {
    return (
        <ComponentWrapper onClick={onClick} background={"white"} color={"black"}>
            {text}
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    padding: 0.25rem;
    background: ${props => props.background};
    color: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    :hover{
        filter: brightness(0.9);
    }
`

export default Button