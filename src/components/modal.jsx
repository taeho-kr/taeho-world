import styled from "styled-components"

const Modal = ({ children, useBackmark }) => {
    return (
        <ComponentWrapper>
            {children}
            {
                useBackmark && <BackMarker />
            }
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    z-index: 2;
`

const BackMarker = styled.div`
    z-index: 1;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #0000004b;
`

export default Modal