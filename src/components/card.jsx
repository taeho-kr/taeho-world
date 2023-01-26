import styled from "styled-components"

const Card = ({ title, description, children }) => {
    return (
        <ComponentWrapper>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            {children}
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid white;
    min-width: 12rem;
    width: fit-content;
    height: fit-content;
`

const CardTitle = styled.span`
    font-size: 1.25rem;
    font-weight: bold;
    color: white;
`

const CardDescription = styled.span`
    color: grey;
`

export default Card