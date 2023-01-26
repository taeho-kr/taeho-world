import styled from "styled-components"

const Appearance = ({ image }) => {

    const onClickComponent = () => {

    }

    return (
        <ComponentWrapper src={image} onClick={onClickComponent} />
    )
}

const ComponentWrapper = styled.img`
    height: 20rem;
    cursor: pointer;
`

export default Appearance